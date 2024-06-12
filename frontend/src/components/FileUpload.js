import React, {useRef, useState, useContext} from 'react'
import { MdOutlineUploadFile } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import "../assets/FileUpload.css"
import {config} from "../config.js"
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import axios from "axios"
import {Link} from 'react-router-dom'
import { GlobalContext } from '../store/GlobalContext.js';
import Loading from './Loading.js';

const FileUpload = () => {
    const inputRef = useRef()
    const {setShowUpload} = useContext(GlobalContext)
    const [selectedFile, setSelectedFile] = useState(null)
    const [progress, setProgress] = useState(0)
    const [uploadStatus, setUploadStatus] = useState("select") // "select" | "uploading" | "done"
    const [imageResult, setImageResult] = useState(null)
    // const [viewResult, setViewResult] = useState(false)

    // Handle file change event
    const handleFileChange = (event) => {
        if(event.target.files && event.target.files.length > 0){
            setSelectedFile(event.target.files[0])
        }
    }

    // Function to trigger file input dialog
     const onChooseFile = () => {
        inputRef.current.click()
     }

    //Function to clear selected file and reset state
    const clearFileInput = () => {
        inputRef.current.value = ""
        setSelectedFile(null)
        setProgress(0)
        setUploadStatus("select")
        setImageResult(null)
    }

    //Function to handle file upload
    const handleUpload = async () => {
        // If upload is already done, clear and return
        if(uploadStatus === "done")
        {
            clearFileInput()
            return
        }

        try{
            // Set upload status to "uploading"
            setUploadStatus("uploading")

            // Create FormData and append selected file
            const formData = new FormData()
            formData.append("file", selectedFile)

            // Make an asyncronous POST request to the server for file upload

            await axios.post(
                `${config.proxy}/api/search-file-upload`, formData,
                {
                    onUploadProgress: (progressEvent) => {
                        // Update progress based on upload progress
                        const percentCompleted = Math.round(
                            (progressEvent.loaded*100)/ progressEvent.total
                        )
                        setProgress(percentCompleted)
                    }
                }
            ).then(function(response){
                if(response.status === 200){
                    if(response.data.data){
                        setImageResult(response.data.data)
                    }
                }
            })

            // await axios.fetch(`${config.proxy}/api/product-eyes`).then(res=>res.json).then(data=> console.log(data))
            setUploadStatus("done")
            // console.log(imageResult)
        }catch(error){
            setUploadStatus("select")
        }
    }

    // const handleResult = () => {
    //     fetch(`${config.proxy}/api/search-file-upload/${selectedFile.name}`).then(res=>res.json())
    //                                                                 .then(data => setImageResult(data))

        
    //     setViewResult(true)
    // }

    return (
        <div>
            <input ref={inputRef} type="file" onChange={handleFileChange} style={{display:"none"}}/>
            {/* Button to trigger the file input dialog */}
            {!selectedFile && (
                <div className="d-flex justify-content-center">
                    <button className="file-btn" onClick={onChooseFile}>
                        <MdOutlineUploadFile class="uploadIcon"/> Chọn hình ảnh
                    </button>
                </div>
            )}

            {/* Display file information and progress when a file is selected */}
            {selectedFile && (
                <div className="text-center">
                    <div className="file-card">
                        <FiFileText/>
                        <div className="file-info">
                            <div style={{flex:1}}>
                                <h6>{selectedFile?.name}</h6>
                                <div className="progress-bg">
                                    <div className="progress" style={{width: `${progress}%`}}/>

                                </div>
                            </div>
                        </div>
                        {uploadStatus === "select" ? (
                            <IoClose class="close-icon" onClick={clearFileInput}/>
                            ):(
                                <div className="check-cirle">
                                    {uploadStatus === "uploading" ? (
                                        `${progress}%`
                                    ): uploadStatus === "done" ? (
                                        <TiTick/>
                                    ):null}
                                </div>
                            )}
                    </div>
                   
                   {/* <div className='imageResult'>
                        {Object.keys(imageResult).length > 0 && uploadStatus === "Done" & (
                            imageResult.map((item, index) => { 
                                return(
                                    <Link key={index} to={item['image_url']}>{item['name']}</Link>
                                )
                            })
                        )}

                    </div> */}
                    {/* Button to finalize upload or clear selection */}
                    {uploadStatus !== 'uploading' && (
                        <button className="upload-btn" onClick={handleUpload}>
                            {uploadStatus === "select" || uploadStatus === "uploading" ? "Tìm kiếm" : "Xong"}
                        </button>
                    )}
  
                    {/* <div className="d-flex justify-content-around">
                        {uploadStatus === "done" && (
                            <button className='btn btn-primary my-2' onClick={handleResult}>View result</button>
                        )}
                    </div> */}
                    
                    {imageResult && uploadStatus === "done" && (
                        <div className="my-2">
                            <Link className="fw-bold fst-italic"
                                to={`${config.host}/pages/product/detail/${imageResult.product_id}`}
                                onClick = {() => setShowUpload(false)}
                            >
                                {imageResult.product_name}
                            </Link>
                        </div>

                    )}

                    {uploadStatus === "uploading" && (
                        <Loading/>
                    )}

                    {!imageResult && uploadStatus === "done" && (
                        <div className="my-2 fst-italic">Không tìm thấy sản phẩm phù hợp</div>
                    )}
                    {/* {Object.keys(imageResult).length > 0 && imageResult.map((item,index)=>{
                        
                        return (
                            <a href={`${config.host}/pages/product/detail/${item['id']}`} key={index}>
                                {item['name']}
                            </a>
                        )
                    })}
                    
                     {Object.keys(imageResult).length === 0 && viewResult === true   && (
                        <>
                            Không tìm thấy kết quả phù hợp
                        </>
                     )} */}
                    
                </div>
            )}
        </div>
    )
}   

export default FileUpload