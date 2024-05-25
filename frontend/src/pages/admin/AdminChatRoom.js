import React, {useState, useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '../../store/GlobalContext'
import { VscAccount } from "react-icons/vsc";
import { BiSupport } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { HiReply } from "react-icons/hi";
import axios from 'axios';
import { config } from '../../config';
import Modal from 'react-bootstrap/Modal'

const AdminChatRoom = () => {
    const params = useParams()
    const [messageData, setMessageData] = useState([{}])
    const [messageSend, setMessageSend] = useState('')
    const [reply, setReply] = useState(0)
    const [modal, setModal] = useState(false)
    const token = localStorage.getItem('Access-Token')

    useEffect(() => {   
        axios.get(`${config.proxy}/api/client/get-message/${params.clientID}`)
        .then(function(response){
            setMessageData(response.data)
        })
    },[])

    const fetchMessage = () => {
        axios.get(`${config.proxy}/api/client/get-message/${params.clientID}`)
        .then(function(response){
            setMessageData(response.data)
        })
    }
    const handleSend = () => {
        if(messageSend === '') alert('Vui lòng nhập thông tin')
        else{
            axios({
                method: 'POST',
                url: `${config.proxy}/api/admin/send-message`,
                data:{
                    admin_message: messageSend,
                    reply_id: reply
                },
                headers:{
                    'Authorization': 'Bearer ' + token
                }
            }).then(function(response){
                if(response.status === 200) {
                    setMessageSend('')
                    fetchMessage()
                    setModal(!modal)
                }
            })
        }
    }

    const handleReply = (reply_id) => {
        setModal(!modal)
        setReply(reply_id)
    }
    return (
        <div className="position-relative mx-0">
            <div className="chat-background">
                    <div className="chat-content">
                        {messageData.map((item, index) => {
                            return (
                                <>


                                   {item['admin_message'] !== null ? (
                                    <>
                                        <div className="d-flex align-items-center justify-content-start">  
                                            <VscAccount size={25}/> <span className="client-message" key={index}>{item['client_message']}</span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-end">
                                            <span className="admin-message" key={index}>{item['admin_message']}</span> <BiSupport size={25}/>
                                        </div>    
                                    </>
                                       
                                   ):(
                                       <div className="d-flex align-items-center justify-content-start">  
                                            <VscAccount size={25}/> <span className="client-message" key={index}>{item['client_message']}</span>
                                            <HiReply className="reply-icon" onClick={() => handleReply(item['id'])}/>
                                        </div>
                                   )}
                                </>
                              
                            )
                        })}
                    </div>
                    
                </div>

                <Modal className="reply-modal" show={modal} onHide={()=> setModal(!modal)}>
                    <Modal.Body className="d-flex justify-content-center">
                        <div>
                            <input type="text" name="message" value={messageSend} onChange={(e)=>setMessageSend(e.target.value)} placeholder="Nhập tin nhắn"/>
                            <RiSendPlaneFill className="send-icon" onClick={handleSend}/>
                        </div>
                    </Modal.Body>
                </Modal>
        </div>
    )
}

export default AdminChatRoom