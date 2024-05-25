import React, {useState, useEffect, useContext} from 'react'
import { config } from '../../config'
import axios from 'axios'
import { FaReply } from "react-icons/fa";
import { GlobalContext } from '../../store/GlobalContext';
import { FaTrash } from "react-icons/fa";
import { RiInboxArchiveFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const AdminSupport = () => {
    const [listID, setListID] = useState([{}])
    const token = localStorage.getItem('Access-Token')
    const {closeNav} = useContext(GlobalContext)
    const [deleteModal, setDeleteModal] = useState(false)
    const [clientID, setClientID] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        axios({
            method: "GET",
            url: `${config.proxy}/api/admin/get-chat-clientID`,
            headers:{
                'Authorization': 'Bearer ' + token
            }
        }).then(function(response){
            if(response.status === 200){
                setListID(response.data)
            } 
        })
    },[token])

    const showModal = (id) => {
        setClientID(id)
        setDeleteModal(!deleteModal)
    }

    const handleDelete = () => {
        axios({
            method: 'POST',
            url: `${config.proxy}/api/admin/delete-room`,
            data:{
                clientID: clientID
            },
            headers:{
                'Authorization': 'Bearer ' + token
            }
        }).then(function(response){
            if(response.status === 200){
                setDeleteModal(!deleteModal)
                window.location.reload(false)
            }
        })
    }
    return (
        <div className="position-relative mx-0"
            style={window.innerWidth > 450 ? {left: closeNav ? '80px' : '280px'}: {left: '80px'}}
        >
            <div className="container">
                <div className="row">
                    {Object.keys(listID).length > 0  && listID.map((item, index) => {
                        return (
                            <div className="col-5 chat-room mx-2 my-1" key={index}>
                                <div className="fw-semibold">Room {index+1}</div>
                                <div>{item['clientID']}</div>
                                <div className="position-relative">
                                    <RiInboxArchiveFill size={25}/>
                                    <div className="noreply-count">{item['noreply']}</div>
                                </div>
                                <Link to={`/admin/pages/support-room-chat/${item['clientID']}`}><FaReply size={20} className="text-primary"/></Link>
                                <FaTrash className="deleteIcon text-danger" size={20} onClick={() => showModal(item['clientID'])}/>
                            </div>
                        )
                    })}     
                </div>
            </div>
            
            <Modal show={deleteModal} onHide={() => setDeleteModal(!deleteModal)}>
                <Modal.Body>
                    <h5 className="fw-bold">Bạn có chắc chắn muốn xóa thông tin hỗ trợ</h5>
                    <div className="btn btn-danger" onClick={handleDelete}>Đồng ý</div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AdminSupport