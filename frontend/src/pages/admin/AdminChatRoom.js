import React, {useState, useEffect, useRef} from 'react'
import { useParams } from 'react-router-dom'
import { VscAccount } from "react-icons/vsc";
import { BiSupport } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { HiReply } from "react-icons/hi";
// import axios from 'axios';
// import { config } from '../../config';
import Modal from 'react-bootstrap/Modal'
import { db } from '../../firestore';
import { collection, onSnapshot, query, orderBy, where, doc, getDocs, updateDoc, serverTimestamp } from 'firebase/firestore';

const AdminChatRoom = () => {
    const params = useParams()
    const [messageData, setMessageData] = useState(null)
    const [messageSend, setMessageSend] = useState('')
    const [reply, setReply] = useState('')
    const [modal, setModal] = useState(false)
    // const token = localStorage.getItem('Access-Token')

    const bottom = useRef(Element)

    const scrollToBottom = () => {
        bottom.current?.lastElementChild?.scrollIntoView({behavior: 'smooth'})
    }

    useEffect(() => { 
        const getData = async() =>{
            const data = await getDocs(query(collection(db, 'support'),where('clientID','==',params.clientID),orderBy('created_at')))
            const result = data.docs.map((doc) => ({id:doc.id, ...doc.data()}))
            setMessageData(result)
            scrollToBottom()
        } 
        // axios.get(`${config.proxy}/api/client/get-message/${params.clientID}`)
        // .then(function(response){
        //     setMessageData(response.data)
        // })

        return () => getData()
    },[params.clientID])

    useEffect(() => {
        const unsub = onSnapshot(query(collection(db,'support'),where('clientID','==',params.clientID),orderBy('created_at')),(querySnapshot) => {
            const result = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
            console.log(result)
            setMessageData(result)
            scrollToBottom()
        })

        return () => unsub()
    },[params.clientID])

    // const fetchMessage = () => {
    //     axios.get(`${config.proxy}/api/client/get-message/${params.clientID}`)
    //     .then(function(response){
    //         setMessageData(response.data)
    //     })
    // }

    // const updateReply = async () => {
    //     await updateDoc(doc(db,'support',reply),{
    //         admin_message: messageSend,
    //         updated_at: serverTimestamp()
    //     })
    // }

    const handleSend = () => {
        if(messageSend === '') alert('Vui lòng nhập thông tin')
        else{
            const preprocess = messageSend.split('\n').join('<br/>').replaceAll(' ','&nbsp;')
            updateDoc(doc(db,'support',reply),{
                admin_message: preprocess,
                updated_at: serverTimestamp()
            })
            setMessageSend('')
            setModal(!modal)
            // axios({
            //     method: 'POST',
            //     url: `${config.proxy}/api/admin/send-message`,
            //     data:{
            //         admin_message: messageSend,
            //         reply_id: reply
            //     },
            //     headers:{
            //         'Authorization': 'Bearer ' + token
            //     }
            // }).then(function(response){
            //     if(response.status === 200) {
            //         setMessageSend('')
            //         fetchMessage()
            //         setModal(!modal)
            //     }
            // })
        }
    }

    const handleReply = (reply_id) => {
        setModal(!modal)
        setReply(reply_id)
    }
    return (
        <div className="position-relative mx-0">
            <div className="chat-background">
                    <div className="chat-content" ref={bottom}>
                        {messageData && messageData.map((item, index) => {
                            return (
                                <>
                                   {item['admin_message'] !== null ? (
                                    <>
                                        <div className="d-flex align-items-center justify-content-start">  
                                            <VscAccount size={25}/> <span className="client-message" key={index} dangerouslySetInnerHTML={{__html:item.client_message}}/>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-end">
                                            <span className="admin-message" key={index} dangerouslySetInnerHTML={{__html:item.admin_message}}/> <BiSupport size={25}/>
                                        </div>    
                                    </>
                                       
                                   ):(
                                       <div className="d-flex align-items-center justify-content-start">  
                                            <VscAccount size={25}/> <span className="client-message" key={index} dangerouslySetInnerHTML={{__html:item.client_message}}/>
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
                        <div className="d-flex align-items-center">
                            <textarea type="text" name="message" className="chat-input-message" value={messageSend} onChange={(e)=>setMessageSend(e.target.value)} placeholder="Nhập tin nhắn"/>
                            <RiSendPlaneFill className="admin-send-icon" onClick={handleSend}/>
                        </div>
                    </Modal.Body>
                </Modal>
        </div>
    )
}

export default AdminChatRoom