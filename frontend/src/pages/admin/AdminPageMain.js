import React, {useEffect} from 'react'
import Header from '../../components/admin/Header'
import Sidebar from '../../components/admin/Sidebar'
import Footer from '../../components/Footer'
import {useNavigate, useLocation} from 'react-router-dom'

const AdminPageMain = ({component}) => {
    const navigate = useNavigate()
    useEffect (() => {
        if(localStorage.getItem('Access-Token') === null) navigate('/admin')
    },[navigate])

    const location = useLocation()
   
    const styling = {
        fontSize: "80px",
        position: "relative",
        top: "50px",
        width: "100%",
        fontFamily: 'Pacifico', 
        textAlign: "center",
       }

    return (
        <>
         <Header />
          <div className="pageContent">
              <Sidebar />
              {location.pathname === '/admin' && (
                <div style={styling}>
                    Bacsie.com Admin System
                </div>
              )}
              {component}
          </div>
          <Footer/>
        </>
    )
}

export default AdminPageMain