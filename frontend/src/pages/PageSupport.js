import React, {useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import {config, containsSpecialChars} from '../config'
import { RiSendPlaneFill } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { BiSupport } from "react-icons/bi";

import axios from 'axios';

const PageSupport = () => {
    const [modal, setModal] = useState(false)
    const checkID = localStorage.getItem('ClientID')
    const [code, setCode] = useState(null)
    const [check, setCheck] = useState(false)
    const [messageData, setMessageData] = useState([{}])
    const [messageSend, setMessageSend] = useState('')

    useEffect(() => {
        if(checkID === null) setModal(true)
        else {
            axios.get(`${config.proxy}/api/client/get-message/${checkID}`)
                .then(res => {
                    setMessageData(res.data)
                })
        }
    },[checkID])

    const fetchMessage = () => {
        axios.get(`${config.proxy}/api/client/get-message/${checkID}`)
                .then(res => {
                    setMessageData(res.data)
                })
    }

    const handleChange = (event) => {
        const value =event.target.value
        if(value === '' || value.includes(' ') || containsSpecialChars(value)) setCheck(true)
        else {
            setCheck(false)
            setCode(value)
        }
    }

    const handleSubmit = () => {
        if(check) alert('Mã đang chứa các kí tự đặc biệt và khoảng trắng')
        else{
            localStorage.removeItem('ClientID')
            localStorage.setItem('ClientID',code)
            setModal(false)
        }
    }

    const handleSend = () => {
        if(messageSend === '') alert('Vui lòng nhập thông tin')
        else{
            axios.post(`${config.proxy}/api/client/send-message`,
            {
                clientID: code,
                message: messageSend
            }).then(function(response){
                if(response.status === 200) {
                    setMessageSend('')
                    fetchMessage()
                }
            })
        }
    }
    return (
        <>
            {checkID === null ? (
                <Modal show={modal} onHide={() => setModal(!modal)}>
                <Modal.Header>
                    <Modal.Title>Thông tin cơ bản</Modal.Title>
                </Modal.Header>

                <Modal.Body className="d-flex align-items-center">
                    <div>
                        <input type = "text" name="code" placeholder="Nhập mã" onChange={handleChange}/>
                        {check && (<div className="text-danger fst-italic">Mã không chứa khoảng trắng và các ký tự đặc biệt</div>)}
                    </div>
        
                    <div className="btn btn-info mx-2 text-light fw-bold" onClick={handleSubmit}>OK</div>
                 
                </Modal.Body>
                <Modal.Footer>
                    <div className="fst-italic">Nhập một mã bất kỳ gồm số hoặc chữ để hệ thống có thể nhận diện đó là bạn</div>
                    <div><span className="text-warning fw-bold">Lưu ý: </span>Đặt mã dễ nhớ để bạn có thể xem câu trả lời từ Admin khi truy cập vào đây</div>
                </Modal.Footer>
            </Modal>
            ):(
                <div className="chat-background">
                    <div className="chat-content">
                        {messageData.map((item, index) => {
                            return (
                                <>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <VscAccount size={25}/> <span className="client-message" key={index}>{item['client_message']}</span>
                                    </div>

                                   {item['admin_message'] !== null && (
                                    <div className="d-flex align-items-center justify-content-end">
                                        <span className="admin-message" key={index}>{item['admin_message']}</span> <BiSupport size={25}/>
                                    </div>        
                                   )}
                                       
                                </>
                              
                            )
                        })}
                    </div>
                    <div className="chat-input">
                        <input type="text" name="message" value={messageSend}onChange={(e)=>setMessageSend(e.target.value)} placeholder="Nhập tin nhắn"/>

                        <RiSendPlaneFill className="send-icon" onClick={handleSend}/>
                    </div>
                </div>
            )}
            
        </>
    )
}

export default PageSupport