import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { config, checkType, formatNumber } from '../../config'
import Modal from 'react-bootstrap/Modal'
import { GlobalContext } from '../../store/GlobalContext'
import { useNavigate } from 'react-router-dom'

const AdminProduct = () => {
    const navigate = useNavigate()
   

    const [data, setData] = useState([{}])
    const {closeNav} = useContext(GlobalContext)

    const [display, setDisplay] = useState([])


    const [modalDisplay, setModalDisplay] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [modalAdd, setModalAdd] = useState(false)

    // Form value
    // const [name, setName] = useState('')
    // const [detail, setDetail] = useState('')
    // const [path, setPath] = useState('')
    // const [price, setPrice] = useState(0)
    // const [type, setType] = useState(0)
    // const [des, setDes] = useState('')

    const [edit, setEdit] = useState({
        id: 0,
        name: '',
        detail: '',
        path: '',
        price: 0,
        type: 0,
        description: ''
    })

    const changeFormEdit = (event) => {
        const {value, name} = event.target
        setEdit(prev => ({
            ...prev, [name]: value
        }))
    }

    const [add, setAdd] = useState({
        add_name: '',
        add_detail: '',
        add_path: null,
        add_price: 0,
        add_type: 0,
        add_description: ''
    })

    const changeFormAdd = (event) => {
        if(event.target.files && event.target.files.length>0)
        {
            const updatePath = {add_path: event.target.files[0]}
            setAdd(prev => ({
                ...prev, ...updatePath
            }))
        }
        else{
            const {value, name} = event.target
            setAdd(prev => ({
                ...prev, [name]:value
            }))
        }

    }

    // Notice
    useEffect(() => {
        // if(localStorage.getItem('Access-Token') === null) navigate('/admin')
        axios.get(config.proxy+"/api/admin/get-all-products")
            .then(res => {
                setData(res.data)
                })
    },[])

    const update = () => {
        const token = localStorage.getItem('Access-Token')
        axios({
            method: "POST",
            url: `${config.proxy}/api/admin/update-product`,
            data:
            {
                id: edit.id,
                name: edit.name,
                detail: edit.detail,
                path: edit.path,
                price: edit.price,
                type: edit.type,
                description: edit.description
            },
            headers: {
                'Authorization': 'Bearer '+ token
            }
        }).then(function(res){
            if(res.status === 200) {
                setModalEdit(false)
                window.location.reload(false)
            }
        })
        // .then(error => console.log(error))
    }
    
    const addConfirm = () => {
        const token = localStorage.getItem('Access-Token')
       
        const formData = new FormData()
        formData.append('name',add.add_name)
        formData.append('detail',add.add_detail)
        formData.append('path',add.add_path)
        formData.append('price',add.add_price)
        formData.append('type',add.add_type)
        formData.append('description',add.add_description)

        axios({
            method: 'POST',
            url: `${config.proxy}/api/admin/add-product`,
            data: formData,
            headers:{
                'Authorization': 'Bearer ' + token
            }
        }).then(function(response){
            if(response.status === 200)
            {
                setModalAdd(false)
                window.location.reload(false)
            }
        }).catch(function(error){
            console.log(error)
        })
    }
    
    const handleDisplay = (item) => {
        setDisplay(item)
        setModalDisplay(!modalDisplay)
    }

    const handleEdit = (item) => {
        setEdit({
            id: item['id'],
            name: item['name'],
            detail: item['detail'],
            path: item['image_url'],
            price: item['price'],
            type: item['type'],
            description: item['description']
        })
        
        setModalEdit(!modalEdit)
    }

    const handleAdd = () => {
        setModalAdd(!modalAdd)
    }


    return (
        <>
            <div className="position-relative mx-0"
                style={{left: closeNav ? '80px' : '280px'}}
            >
                <div className="add-icon" onClick={handleAdd}>
                    <img src={`${config.image_path}/images/add-product.svg`} alt=''/> Thêm sản phẩm
                </div>
                {data.map((item, index)=>{
                    return(
                        <div className="list-product-item" key={index}>
                            <img src={config.image_path+item['image_url']} alt=''/>
                            <div className="fw-bold">{item['name']}</div>
                            <div className="text-primary fw-bold">{formatNumber(item['price'])}</div>
                            <div className="fst-italic">{checkType(item['type'])}</div>
                            <div className="d-flex">
                                <div className="fs-6 fw-semibold text-primary mx-1 " onClick={() => handleDisplay(item)}>Xem</div> |
                                <div className="fs-6 fw-semibold text-warning mx-1" onClick={() => handleEdit(item)}>Sửa</div> |
                                <div className="fs-6 fw-semibold text-danger mx-1">Xóa</div> 
                            </div>
                        </div>
                    
                    )
                })}
            </div>

            <Modal className="display-modal" show={modalDisplay} onHide={() => setModalDisplay(!modalDisplay)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h4>Tên đầy đủ: </h4>{display['detail']}
                    </div>
                    <div>
                        <h4>Mô tả:</h4>
                        <div style={{fontSize: '16px'}} dangerouslySetInnerHTML={{__html:display['description']}}/> 
                    </div> 
                </Modal.Body>
            </Modal>

            <Modal className="edit-modal" show={modalEdit} onHide={() => setModalEdit(!modalEdit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-edit-body">
                    <div>
                        <b>Tên: </b><input type="text" name="name" value={edit.name} onChange={changeFormEdit}/>
                    </div>
                    <div>
                        <b>Tên đầy đủ: </b><textarea type="text" name="detail" value={edit.detail} onChange={changeFormEdit}/>
                    </div>
                    <div>
                        <b>Giá: </b><input type="number" name="price" value={edit.price} onChange={changeFormEdit}/>
                    </div>
                    <div>
                        <b>Đường dẫn: </b><input type="text" name="path" value={edit.path} onChange={changeFormEdit}/>
                    </div>
                    <div>
                        <b>Loại: </b>
                        <select name="type" value={edit.type} onChange={changeFormEdit}>
                            <option value="0">Nhãn khoa</option>
                            <option value="1">Nhi khoa</option>
                            <option value="2">Sản phẩm khác</option>
                        </select>
                        {/* <input type="text" name="type" value={edit.type} onChange={changeFormEdit}/> */}
                    </div>
                    <div>
                        <h4>Mô tả</h4>
                        <textarea type="text" name="description" value={edit.description} onChange={changeFormEdit}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn btn-warning" onClick={update}>Cập nhật</div>
                </Modal.Footer>
            </Modal>

            <Modal className="add-modal" show={modalAdd} onHide={() => setModalAdd(!modalAdd)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-add-body">
                    <div>
                        <b>Tên: </b><input type="text" name="add_name" onChange={changeFormAdd}/>
                    </div>
                    <div>
                        <b>Tên đầy đủ: </b><textarea type="text" name="add_detail" onChange={changeFormAdd}/>
                    </div>
                    <div>
                        <b>Giá: </b><input type="number" name="add_price" onChange={changeFormAdd}/>
                    </div>
                    <div>
                        <b>Hình ảnh: </b><input type="file" name="add_path" onChange={changeFormAdd}/>
                    </div>
                    <div>
                        <b>Loại: </b>
                        <select name="type" value={edit.type} onChange={changeFormEdit}>
                            <option value="0">Nhãn khoa</option>
                            <option value="1">Nhi khoa</option>
                            <option value="2">Sản phẩm khác</option>
                        </select>
                        {/* <input type="text" name="add_type"onChange={changeFormAdd}/> */}
                    </div>
                    <div>
                        <h4>Mô tả</h4>
                        <textarea type="text" name="add_description" onChange={changeFormAdd}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn btn-success" onClick={addConfirm}>Thêm sản phẩm</div>
                </Modal.Footer>
            </Modal>
        </>
       
    )
}

export default AdminProduct