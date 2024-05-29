import React, {useState, useEffect, useRef} from 'react'
import Modal from 'react-bootstrap/Modal'
import {containsSpecialChars} from '../config'
import { RiSendPlaneFill } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { BiSupport } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// Firestore
import { db } from '../firestore';
import { collection, query, where, orderBy, addDoc, getDocs, onSnapshot, serverTimestamp } from "firebase/firestore"; 

const PageSupport = () => {
    const [modal, setModal] = useState(false)

    const checkID = localStorage.getItem('ClientID')

    const [code, setCode] = useState(null)
    const [check, setCheck] = useState(false)
    const [messageData, setMessageData] = useState(null)
    const [messageSend, setMessageSend] = useState('')
    const navigate = useNavigate()
    
    const CIM = document.querySelector('.chat-input-message')
    const CB = document.querySelector('.chat-content')

    const bottom = useRef(Element)

    const scrollToBottom = () => {
        bottom.current?.lastElementChild?.scrollIntoView({behavior: 'smooth'})
    }


    useEffect(()=>{
        if(checkID === null) setModal(true)
        
        const getData =  async() => {
                const querySnapshot = await getDocs(query(collection(db, "support"),where('clientID', '==', checkID),orderBy("created_at")));
                const result = querySnapshot.docs.map((doc) => ({id:doc.id, ...doc.data()}))
                setMessageData(result)
                scrollToBottom()
            }

        // if(checkID === null) setModal(true)
        // else {
        //     axios.get(`${config.proxy}/api/client/get-message/${checkID}`)
        //         .then(res => {
        //             setMessageData(res.data)
        //             scrollToBottom()
        //         })
        // }
        return () => getData()
    },[checkID])

    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, "support"), where('clientID', '==', checkID), orderBy("created_at")), (querySnapshot) => {
            const result = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
            setMessageData(result)
            scrollToBottom()
        });  

        return () => unsub()
    }, [checkID])
   
    // const fetchMessage = () => {
    //     axios.get(`${config.proxy}/api/client/get-message/${checkID}`)
    //             .then(res => {
    //                 setMessageData(res.data)
    //                 scrollToBottom()
    //             })
    // }

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

    const handleSend = async () => {
        if(messageSend === '') alert('Vui lòng nhập thông tin')
        else{
            await addDoc(collection(db, 'support'),{
                clientID: checkID,
                client_message: messageSend,
                admin_message: null,
                created_at: serverTimestamp(),
                updated_at:  serverTimestamp(),
            })

            setMessageSend('')
            CIM.style.height = '40px'
            CB.style.height = 'calc(100vh - 200px)'

            // axios.post(`${config.proxy}/api/client/send-message`,
            // {
            //     clientID: checkID,
            //     message: messageSend
            // }).then(function(response){
            //     if(response.status === 200) {
            //         setMessageSend('')
            //         fetchMessage()
            //         CIM.style.height = '40px'
            //         CB.style.height = 'calc(100vh - 200px)'
            //     }
            // })
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
                    <div className="chat-content" ref={bottom}>
                        <div className="d-flex align-items-center justify-content-end">
                            <span className="admin-message">Bạn có thể đặt câu hỏi tại đây</span> <BiSupport size={25}/>
                        </div>
                      
                        {messageData && messageData.map((item, index) => {
                            return (
                                <>
                                    <div className="d-flex align-items-center justify-content-start" key={item.id}>
                                        {/* <VscAccount size={25}/> <span className="client-message" key={index}>{item.data['client_message']}</span> */}
                                        <VscAccount size={25}/> <span className="client-message">{item.client_message}</span>
                                    </div>

                                   {item.admin_message !== null && (
                                    <div className="d-flex align-items-center justify-content-end" key={index}>
                                        {/* <span className="admin-message" key={index}>{item.data['admin_message']}</span> <BiSupport size={25}/> */}
                                        <span className="admin-message">{item.admin_message}</span> <BiSupport size={25}/>
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