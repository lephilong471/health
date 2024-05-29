import React, {useState, useEffect, useContext} from 'react'
import { config } from '../../config'
import axios from 'axios'
import { FaReply } from "react-icons/fa";
import { GlobalContext } from '../../store/GlobalContext';
import { FaTrash } from "react-icons/fa";
import { RiInboxArchiveFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
// import { useNavigate } from 'react-router-dom';
import { db } from '../../firestore';
import {collection, getDocs, doc, deleteDoc, onSnapshot, query, orderBy} from 'firebase/firestore';

const AdminSupport = () => {
    const [listID, setListID] = useState([])
    const token = localStorage.getItem('Access-Token')
    const {closeNav} = useContext(GlobalContext)
    const [deleteModal, setDeleteModal] = useState(false)
    const [clientID, setClientID] = useState('')
    // const navigate = useNavigate()

    const setRoomData = (data) => {
        const clientIDs = []
        data !== null && data.forEach((item) => {
            if(!clientIDs.includes(item.clientID)) clientIDs.push(item.clientID)
        })

        const listID = []
        clientIDs !== null && clientIDs.forEach(clientID => {
            listID.push({
                clientID: clientID,
                noreply: data.filter((item) => item.admin_message === null && item.clientID === clientID).length,
                message: data.filter((item) => item.clientID === clientID)
            })
        })

        setListID(listID)
    }

    useEffect(() => {
        const getData = async () => {
            const querySnapshot = await getDocs(query(collection(db, 'support'),orderBy('create_at')))
            const data = querySnapshot.docs.map((doc) => ({id:doc.id, ...doc.data()}))
            setRoomData(data)
        }
        // const data = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))

        // axios({
        //     method: "GET",
        //     url: `${config.proxy}/api/admin/get-chat-clientID`,
        //     headers:{
        //         'Authorization': 'Bearer ' + token
        //     }
        // }).then(function(response){
        //     if(response.status === 200){
        //         setListID(response.data)
        //     } 
        // })

        return () => getData()
    },[])

    useEffect(() => {
        const unsub = onSnapshot(query(collection(db,'support'),orderBy('created_at')), (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
            console.log(data)
            setRoomData(data)
        })

        return () => unsub()
    },[])
    const showModal = (id) => {
        setClientID(id)
        setDeleteModal(!deleteModal)
    }

    const deleteRoom = () => {
        const roomData = listID.filter((item) => item.clientID === clientID)
  
        roomData[0].message.forEach((item) => {
            deleteDoc(doc(db, 'support', item.id))
        })
    }

    const handleDelete = () => {
        deleteRoom()
        setDeleteModal(!deleteModal)
        // window.location.reload(false)
        // axios({
        //     method: 'POST',
        //     url: `${config.proxy}/api/admin/delete-room`,
        //     data:{
        //         clientID: clientID
        //     },
        //     headers:{
        //         'Authorization': 'Bearer ' + token
        //     }
        // }).then(function(response){
        //     if(response.status === 200){
        //         setDeleteModal(!deleteModal)
        //         window.location.reload(false)
        //     }
        // })
    }
    return (
        <div className="position-relative mx-0"
            style={window.innerWidth > 450 ? {left: closeNav ? '80px' : '280px'}: {left: '80px'}}
        >
            <div className="container">
                <div className="row">
                    {Object.keys(listID).length > 0 ?
                        (listID.map((item, index) => {
                        return (
                            <div className="col-xl-3 col-lg-5 col-md-5 col-11 chat-room my-1 mx-2" key={index}>
                                <div className="fw-semibold">Room {index+1}</div>
                                <div>{item.clientID}</div>
                                <div className="position-relative">
                                    <RiInboxArchiveFill size={25}/>
                                    <div className="noreply-count">{item.noreply}</div>
                                </div>
                                <Link to={`/admin/pages/support-room-chat/${item.clientID}`}><FaReply size={20} className="text-primary"/></Link>
                                <FaTrash className="deleteIcon text-danger" size={20} onClick={() => showModal(item.clientID)}/>
                            </div>
                        )
                    })):(
                        <h1 className="my-4" style={{fontFamily: "Pacifico"}}>Chưa có sự hỗ trợ nào từ phía khách hàng</h1>
                    )}     
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