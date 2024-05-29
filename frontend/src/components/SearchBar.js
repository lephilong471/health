import React, {useState, useContext} from 'react'
import { IoSearchOutline } from "react-icons/io5"
import { config } from '../config'
import { TbCameraHeart } from "react-icons/tb"
import Modal from 'react-bootstrap/Modal'
import FileUpload from './FileUpload'
import { GlobalContext } from '../store/GlobalContext'

const SearchBar = ({setResult}) => {
    // const [input, setInput] = useState("")
    const [show, setShow] = useState(false);
    const {search, setSearch} = useContext(GlobalContext)

    const fetchData = (value) => {
        if(value === "")  setResult([])
        else{
            fetch(`${config.proxy}/api/search/${value}`).then(res => res.json())
                                                        .then(data => setResult(data))
        }
         
                                    
    }
    const handleChange = (value) => {
        fetchData(value)
        setSearch(value)
        // setInput(value)
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <TbCameraHeart className="cameraIcon" onClick={handleShow}/>
        <input type='text' className="search" placeholder='Tìm kiếm' value={search} onChange ={(e) => handleChange(e.target.value)}/>
        <IoSearchOutline className="searchIcon"/>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tìm kiếm bằng hình ảnh</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
            <FileUpload/>
        </Modal.Body>
        <Modal.Footer>
            
        </Modal.Footer>
        </Modal>
        </>
    )
}

export default SearchBar