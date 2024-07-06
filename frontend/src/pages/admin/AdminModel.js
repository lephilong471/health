import React,{useState, useRef, useContext} from 'react'
import { GlobalContext } from '../../store/GlobalContext'
import axios from 'axios'
import { config } from '../../config';
import { IoClose } from "react-icons/io5";
import Loading from '../../components/Loading';

const AdminModel = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const inputRef = useRef()
    const {closeNav, adminToken, setAdminToken} = useContext(GlobalContext)
    const [resultData, setResultData] = useState(null)
    const [resultName, setResultName] = useState(null)
    const [viewImage, setViewImage] = useState(null)
    const [loadStatus, setLoadStatus] = useState(false)

    const handleFileChange = (event) => {
        if(event.target.files && event.target.files.length>0){
            setSelectedFile(event.target.files[0])

            const formData = new FormData()
            formData.append('file', event.target.files[0])

            axios({
                method: 'POST',
                url: `${config.proxy}/api/admin/view-image/add`,
                data: formData,
                headers:{
                    'Authorization': 'Bearer '+adminToken
                }
            }).then(function(response){
                if(response.status === 200){
                    response.access_token && setAdminToken(response.access_token)
                    setViewImage(response.data.path)
                }
            })
        }
    }

    const onChooseFile = () => {
        inputRef.current.click()
    }

    const handleResult = () => {
        if(!selectedFile && !viewImage) alert('Vui lòng chọn file')
        else{
            setLoadStatus(true)
            axios({
                method:'POST',
                url:`${config.proxy}/api/admin/model-evaluate`,
                data: {
                    path: viewImage
                },
                headers:{
                    'Authorization': 'Bearer '+adminToken
                }
            }).then(function(response){
                if(response.status === 200){
                    response.access_token && setAdminToken(response.access_token)
                    setResultData(response.data.data)
                    setResultName(response.data.predict_name)
                    setLoadStatus(false)
                }
            })
        }
    }

    const deleteViewImage = (path) => {
        axios({
            method: 'POST',
            url: `${config.proxy}/api/admin/view-image/delete`,
            data: {
                path: path
            },
            headers: {
                'Authorization': 'Bearer '+adminToken
            }
        }).then(function(response){
            if(response.status === 200){
                response.access_token && setAdminToken(response.access_token)

            }
        })
    }
    const clearFileInput = () => {
        setResultData(null)
        setSelectedFile(null)
        setResultName(null)
        deleteViewImage(viewImage)
        setViewImage(null)
    }

    return (
        <div className="position-relative mx-0 my-2"
            style={{left: closeNav ? '80px' : '280px'}}
        >
            <h2>Phân tích đánh giá mô hình</h2>
            <input ref={inputRef} type="file" onChange={handleFileChange} style={{display:"none"}}/>
            
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        {!selectedFile ? (
                            <div className="d-flex justify-content-center">
                                <div className="file-btn" onClick={onChooseFile}>Tải hình ảnh lên</div>
                            </div>
                        ):(
                            <div className="d-flex justify-content-center">
                                {selectedFile.name}
                                <IoClose class="close-icon" onClick={clearFileInput}/>
                            </div>
                        )}
                        
                        {viewImage && (
                            <div className="d-flex justify-content-center">
                                <img className="admin-view-image" src={`${config.proxy}/${viewImage}`} alt=''/>
                            </div>
                        )}
                    
                        <div className="btn btn-secondary my-2" onClick={handleResult}>Xem kết quả</div>
                    </div>
                    <div className="col-6">
                        {resultName ? (
                            <h3 className="fst-italic">{resultName}</h3>
                        ):(
                            <h3 className="fst-italic">Kết quả dự đoán</h3>
                        )}

                        {loadStatus && (
                            <Loading/>
                        )}   

                        {resultData && resultData.map((item, index) => {
                            return(
                                resultName === item.name ? (
                                    <div key={index} className="text-danger fst-italic fw-bold">{item.name} - ({item.value})</div>
                                ):
                                (
                                    <div key={index}>{item.name} - ({item.value})</div>
                                )
                            )
                        })}
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default AdminModel