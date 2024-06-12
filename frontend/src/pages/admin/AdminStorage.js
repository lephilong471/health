import React, {useState, useEffect, useContext, useRef} from 'react'
import axios from 'axios'
import { GlobalContext } from '../../store/GlobalContext'
import { config } from '../../config'
import { FaTrash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import Modal from 'react-bootstrap/Modal'
import { MdOutlineUploadFile } from "react-icons/md";

const AdminStorage = () => {
    const [tempImage, setTempImage] = useState(null)
    const [productImage, setProductImage] = useState(null)
    const {adminToken, setAdminToken} = useContext(GlobalContext)
    const [showEdit, setShowEdit] = useState(false)
    const [editPath, setEditPath] = useState({
        old_path:'',
        new_path:''
    })
    const uploadRef = useRef()
    const [uploadFile, setUploadFile] = useState(null)
    

    useEffect(() => {
        axios({
            method:'GET',
            url: `${config.proxy}/api/admin/storage`,
            headers:{
                'Authorization': 'Bearer '+adminToken
            }
        }).then(function(response){
            if(response.status === 200){
                response.access_token && setAdminToken(response.access_token)
                setTempImage(response.data.temp_image)
                setProductImage(response.data.product_image)

            }
        })
    },[adminToken, setAdminToken])

    const handleEdit = (item) => {
        setShowEdit(!showEdit)
        setEditPath({
            old_path: item,
            new_path: item
        })
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setEditPath(prev => ({
            ...prev, [name]:value
        }))
    }
    // Edit product image path
    const handleSubmit = () => {
        if(editPath.new_path === '' || editPath.new_path.includes(' ')) alert('Đường đẫn không hợp lệ')
        else{
            axios({
                method:'POST',
                url: `${config.proxy}/api/admin/storage`,
                data:{
                    type:'edit',
                    old_path: editPath.old_path,
                    new_path: editPath.new_path
                },
                headers:{
                    'Authorization': 'Bearer '+ adminToken
                }
            }).then(function(response){
                if(response.status === 200){
                    response.access_token && setAdminToken(response.access_token)
                    setShowEdit(!showEdit)
                    window.location.reload(false)
                }
            })
        }
    }

    const onChooseFile = (event) => {
        if(event.target.files && event.target.files.length > 0){
            setUploadFile(event.target.files[0])
        }
    }
    
    const uploadImage = () => {
        const formData = new FormData()
        formData.append("file",uploadFile)

        axios({
            method: 'POST',
            url: `${config.proxy}/api/admin/upload-to-storage`,
            data: formData,
            headers:{
                'Authorization': 'Bearer '+adminToken
            }
        }).then(function(response){
            if(response.status === 200){
                response.access_token && setAdminToken(response.access_token)
                window.location.reload(false)
            }
        })
    }

    const deleteTemp = (item) => {
        axios({
            method: 'POST',
            url: `${config.proxy}/api/admin/storage`,
            data:{
                type:'delete',
                filename: item
            },
            headers:{
                'Authorization': 'Bearer '+ adminToken
            }
        }).then(function(response){
            if(response.status === 200){
                response.access_token && setAdminToken(response.access_token)
                window.location.reload(false)
            }

        })
    }

    return (
        <>
            <div className="position-relative mx-0 my-2">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <input type="file" onChange = {onChooseFile} ref={uploadRef} style={{display: 'none'}} />
                            <h2>Ảnh sản phẩm <MdOutlineUploadFile className="uploadIcon" onClick={() => uploadRef.current.click()}/></h2>
                            {uploadFile && (       
                                <div className="d-flex">
                                    {uploadFile.name}
                                    <div className="btn btn-secondary mx-2" onClick={uploadImage}>OK</div>
                                </div>
                            )}
                            {productImage && productImage.map((item, index) => {
                                return(
                                    <div key={index} className="d-flex justify-content-between align-items-center my-2 border-secondary-subtle border-bottom">
                                        <img width={100} src={`${config.proxy}/static/public/drugs/${item}`} alt=''/>
                                        <span>{item}</span>
                                        <CiEdit size={25} className="text-warning editIcon" onClick={() => handleEdit(item)}/>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="col-6">
                            <h2>Ảnh tạm</h2>
                            {tempImage && tempImage.map((item,index) => {
                                return(
                                    <div key={index} className="d-flex justify-content-between align-items-center my-2 border-secondary-subtle border-bottom">
                                        <img width={100} src={`${config.proxy}/static/temp/${item}`} alt=''/>
                                        <span>{item}</span>
                                        <FaTrash width ={25} onClick={() => deleteTemp(item)}className="text-danger deleteIcon"/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showEdit} onHide = {() => setShowEdit(!showEdit)}>
                <Modal.Header>
                    <Modal.Title>Chỉnh sửa đường dẫn ảnh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" value={editPath.new_path} name="new_path" onChange={handleChange}/>
                    <div className="btn btn-warning mx-2" onClick={handleSubmit}> Cập nhật </div>
                </Modal.Body>
            </Modal>
        </>

    )
}

export default AdminStorage;