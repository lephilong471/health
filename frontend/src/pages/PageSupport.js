import React, {useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import {config, containsSpecialChars} from '../config'
import { RiSendPlaneFill } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { BiSupport } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PageSupport = () => {
    const [modal, setModal] = useState(false)
    const checkID = localStorage.getItem('ClientID')
    const [code, setCode] = useState(null)
    const [check, setCheck] = useState(false)
    const [messageData, setMessageData] = useState([{}])
    const [messageSend, setMessageSend] = useState('')
    const navigate = useNavigate()
    
    const CIM = document.querySelector('.chat-input-message')
    const CB = document.querySelector('.chat-content')

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
        
        if(value === null || value === '' || value.includes(' ') || containsSpecialChars(value)) setCheck(true)
        else {
            setCheck(false)
            setCode(value)
        }
    }

    const handleSubmit = () => {
        if(check || !code) alert('Mã không hợp lệ')
        else{
            localStorage.setItem('ClientID',code)
            setModal(false)
        }
    }

    const handleSend = () => {
        if(messageSend === '') alert('Vui lòng nhập thông tin')
        else{
            axios.post(`${config.proxy}/api/client/send-message`,
            {
                clientID: checkID,
                message: messageSend
            }).then(function(response){
                if(response.status === 200) {
                    setMessageSend('')
                    fetchMessage()
                    CIM.style.height = '40px'
                    CB.style.height = 'calc(100vh - 200px)'
                }
            })
        }
    }

    const handleExit = () => {
        localStorage.removeItem('ClientID')
        navigate('/pages/support')
    }

    const inputMessage = (event) => {
        if(CIM !== null && CB !== null){
            CIM.addEventListener('keyup', e => {
                if(e.target.value !== '')
                {
                    let scHeight = e.target.scrollHeight
                    console.log(scHeight)
                    CIM.style.height = `${scHeight}px`
                    CB.style.height = `calc(100vh - 200px - ${scHeight}px + 44px`
                }
                else{
                    CIM.style.height = '40px'
                    CB.style.height = 'calc(100vh - 200px)'
                }

            })
        }
        
        setMessageSend(event.target.value)
    }

    return (
        <>
            {checkID === null ? (
                <Modal show={modal} onHide={() => setModal(!modal)}>
                <Modal.Header>
                    <Modal.Title>Thông tin cơ bản</Modal.Title>
                </Modal.Header>

                <Modal.Body className="d-flex align-items-center">
                    <div className="w-50">
                        <input type = "text" name="code" className="p-1" placeholder="Nhập mã" onChange={handleChange}/>
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
                        <div className="d-flex align-items-center justify-content-end">
                            <span className="admin-message">Bạn có thể đặt câu hỏi tại đây</span> <BiSupport size={25}/>
                        </div>   
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
                        <ImExit className="chat-exit" onClick={handleExit}/>
                        <textarea type="text" className="chat-input-message" value={messageSend} name="message" onChange={inputMessage} placeholder="Nhập tin nhắn"/>
                        <RiSendPlaneFill className="send-icon" onClick={handleSend}/>
                    </div>
                </div>
            )}
            
        </>
    )
}

export default PageSupport