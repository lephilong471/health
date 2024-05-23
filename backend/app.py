from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS
from flask_dropzone import Dropzone
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, unset_jwt_cookies, get_jwt, get_jwt_identity
from datetime import datetime, timedelta, timezone
import os
import cv2
import pytesseract
from config import tesseract_cmd
import json
import bcrypt

app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = '0969099045'
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

dir_path = os.path.dirname(os.path.realpath(__file__))
app.config.update(
    UPLOADED_PATH = os.path.join(dir_path, "static/temp/"),
    PUBLIC_PATH = os.path.join(dir_path, "static/public/"),
    DROPZONE_ALLOWED_FILE_TYPE = "image",
    DROPZONE_MAX_FILE_SIZE = 3,
    DROPZONE_MAX_FILE = 1
)

CORS(app)
dropzone = Dropzone(app)
jwt = JWTManager(app)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,true')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

mysql = mysql.connector.connect(host='localhost',port='3306',database='health',user='root',
                                password='123456')


@app.route('/')
def Index():
#     cur = mysql.cursor()
#     cur.execute('INSERT INTO data VALUES (6,2)')
#     mysql.commit()
#     cur.close()
    return 'Success'

# Start of function
def convert_product(data):
    result = []
    for i in data:
        result.append({ 
            'id':  i[0],
            'name': i[1],
            'detail': i[2],
            'image_url': i[3],
            'price': i[4],
            'description': i[5],
            'type': i[6]
        })
    return result

def image_to_text(image_path):
    pytesseract.pytesseract.tesseract_cmd = tesseract_cmd
        
    img = cv2.imread(image_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    boxes = pytesseract.image_to_data(img, lang="vie")

    sentence = str()

    for i,box in enumerate(boxes.splitlines()):
        if i == 0: continue

        box = box.split()
        if(len(box) == 12):
            sentence += box[11] + " "  

    return sentence

def search_product_from_string(sentence):
    result = []

    cursor = mysql.cursor()
    cursor.execute("SELECT * FROM medicine")
    products = convert_product(cursor.fetchall())
    cursor.close()
    
    print('Sentence', sentence)
    words = sentence.split(' ')

    for product in products:
        for word in words:
            if(product['name'].lower() in word.lower()):
                print('Word',word)
                result.append(product['id'])
    return result
# End of function

@app.route('/api/product-eyes')
def productEyes():
    cursor = mysql.cursor()
    cursor.execute("SELECT * FROM medicine WHERE type = 0")
    result = convert_product(cursor.fetchall())
    cursor.close()
    return result

@app.route('/api/product-child')
def productChild():
    cursor = mysql.cursor()
    cursor.execute("SELECT * FROM medicine WHERE type = 1")
    result = convert_product(cursor.fetchall())
    cursor.close()
    return result

@app.route('/api/product-other')
def productOther():
    cursor = mysql.cursor()
    cursor.execute("SELECT * FROM medicine WHERE type = 2")
    result = convert_product(cursor.fetchall())
    cursor.close()
    return result

@app.route('/api/product-detail/<int:id>',methods=['GET'])
def productDetaile(id):
    cursor = mysql.cursor()
    cursor.execute("SELECT * FROM medicine WHERE id = "+str(id))
    result = convert_product(cursor.fetchall())
    return result

@app.route('/api/search/<string:value>',methods=['GET'])
def search(value):
    if value == "": return ""
    
    cursor = mysql.cursor()
    cursor.execute("SELECT * FROM medicine WHERE name LIKE '%"+value+"%'")
    result = []
    for i in cursor.fetchall():
        result.append({
            'id': i[0],
            'name':i[1]
        })
    return result

@app.route('/api/search-file-upload',methods=['POST'])
def search_file_upload():        
    if request.method == 'POST':
        f = request.files.get('file')
        filename, extension = f.filename.split(".")
        hash_name = str(abs(hash(f.filename)))

        file_location = os.path.join(app.config['UPLOADED_PATH'],filename)
        f.save(file_location)
     
        sentence = image_to_text(file_location)
        search = search_product_from_string(sentence)

        print('Sentence',sentence)
        # INSERT TO image_to_text TABLE
        cursor = mysql.cursor()
        for product_id in search:
            query = "INSERT INTO image_to_text VALUES (NULL,'" + f.filename + "','" + hash_name + "'," + str(product_id) + ",'" + str(datetime.now()) + "','" + str(datetime.now()) + "')"
            cursor.execute(query)
        mysql.commit()

        os.remove(file_location)
        cursor.close()

    return 'Success'

@app.route('/api/search-file-upload/<string:image_name>',methods=['GET'])
def getImage(image_name):
    cursor = mysql.cursor()
    cursor.execute("SELECT DISTINCT (a.id), a.name, a.image_url FROM medicine as a JOIN image_to_text WHERE a.id = image_to_text.product_id AND image_to_text.image_name = '"+str(image_name)+"'")
    data = cursor.fetchall()
    result = []
    for i in data:
        result.append({
            'id': i[0],
            'name': i[1],
            'image_url':i[2]
        })
    
    cursor.close()
    return result

@app.route('/api/admin-login', methods=['POST'])
def admin_login():
    username = request.json['username']
    password = request.json['password']
    b_password = password.encode()

    cursor = mysql.cursor()
    cursor.execute('SELECT username, password FROM admin')
    [u, p] = cursor.fetchone()

    if( username == u and bcrypt.checkpw(b_password,p.encode())):
        access_token = create_access_token(identity=username)
        return jsonify({'token': access_token}), 200
    return jsonify({'error': 'Unauthorized!'}), 401

@app.route('/api/admin-logout', methods=['GET'])
def admin_logout():
    response = jsonify({'msg': 'Logout successfully!'})
    unset_jwt_cookies(response)
    return response

@app.route('/api/admin/get-all-products')
def admin_get_all_products():
    cursor = mysql.cursor()
    cursor.execute('SELECT * FROM medicine')
    data = convert_product(cursor.fetchall())
    cursor.close()
    return data

@app.route('/api/admin/update-product', methods=['POST'])
@jwt_required()
def admin_update_product():
    p_id = str(request.json['id'])
    p_name = str(request.json['name'])
    p_detail = str(request.json['detail'])
    p_price = str(request.json['price'])
    p_type = str(request.json['type'])
    p_path = str(request.json['path'])
    p_description = str(request.json['description'])

    cursor = mysql.cursor()
    cursor.execute("UPDATE medicine SET name='"+p_name+"',detail='"+p_detail+"',price='"+p_price+"',type='"+p_type+"',image_url='"+p_path+"',description='"+p_description+"',updated_at='"+str(datetime.now())+"' WHERE id='"+p_id+"'")
    mysql.commit()
    cursor.close()

    return jsonify({'msg': 'Update Successfully!'}), 200


@app.route('/api/admin/add-product', methods=['POST'])
@jwt_required()
def admin_add_product():
    f = request.files.get('path')
    file_location = os.path.join(app.config['PUBLIC_PATH'],'drugs/'+f.filename)
    f.save(file_location)

    p_path = str('/drugs/'+f.filename)
    p_name = str(request.form['name'])
    p_detail = str(request.form['detail'])
    p_price = str(request.form['price'])
    p_type = str(request.form['type'])
    p_description = str(request.form['description'])
   
    cursor = mysql.cursor()
    cursor.execute("INSERT INTO medicine VALUES (NULL,'"+p_name+"','"+p_detail+"','"+p_path+"','"+p_price+"','"+p_description+"','"+p_type+"','"+str(datetime.now())+"','"+str(datetime.now())+"')")
    mysql.commit()
    cursor.close()
    
    return jsonify({'msg' : 'Add Successfully!'}),200

@app.route('/api/client/get-message/<string:clientID>',methods=['GET'])
def client_get_message(clientID):
    cursor = mysql.cursor()
    cursor.execute("SELECT * FROM support WHERE clientID='"+str(clientID)+"'")
    data = []
    for i in cursor.fetchall():
        data.append({
            'client_message': i[2],
            'admin_message': i[3]
        })
    
    mysql.commit()
    cursor.close()
    return jsonify(data), 200

@app.route('/api/client/send-message', methods = ['POST'])
def client_send_message():
    clientID = str(request.json['clientID'])
    message = str(request.json['message'])
    cursor = mysql.cursor()
    cursor.execute("INSERT INTO support (clientID, client_message,created_at,updated_at) VALUES ('"+clientID+"','"+message+"','"+str(datetime.now())+"','"+str(datetime.now())+"')")
    mysql.commit()
    cursor.close()
    return jsonify({'msg': 'Client Add Message Successfully!'}), 200

@app.route('/test', methods=['GET'])
@jwt_required()
def test():

    return 'Success'

if __name__ == '__main__':
    app.run(debug=True)