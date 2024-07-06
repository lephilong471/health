import React, {useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import {SearchResult} from './SearchResult'
import SearchBar from './SearchBar'
import { GlobalContext } from '../store/GlobalContext'

const Header = () => {
    const [result, setResult] = useState([])
    const {toggle} = useContext(GlobalContext)

    return (
        <div className="header">
            <div className="headerLogo">
                <Link to="/" >
                    <img src='/images/logo.svg' alt=''/>
                </Link>
            </div>
            <div className="headerContent">
                <Link className="headerItem" to="/pages/about"> Về bacsie.com</Link>
                <Link className="headerItem" to="/pages/info"> Thông tin khám </Link>
                <div className="d-flex flex-nowrap justify-content-center">
                    <SearchBar setResult = {setResult}/>
                    <SearchResult result = {result}/>                    
                </div>
                {window.innerWidth < 450 && (
                    // <Link className="navIcon" to="#">
                    <div><img src='/images/navbar.svg' onClick={toggle} width="20" alt=''/></div>
                      
                //   </Link>
                )}
            </div>
        </div>
    )
}

export default Header