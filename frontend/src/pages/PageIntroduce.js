import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {useLocation} from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const PageIntroduce = ({component}) => {
    const location = useLocation()
    const style= {
        background:"#F7FFFD"
    }
    return (
        <>
            <Header/>
            <div className="pageContent" 
                style={(location.pathname === '/pages/service' || location.pathname === '/pages/term-of-use' || location.pathname === '/pages/secure-policy') ? style:null}>
                {window.innerWidth <= 450 && (<Sidebar />)}
                {component}
            </div>
            <Footer/>
        </>
      
    )
}

export default PageIntroduce