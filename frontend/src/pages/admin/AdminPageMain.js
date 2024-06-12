import React, {useEffect, useContext} from 'react'
import Header from '../../components/admin/Header'
import Sidebar from '../../components/admin/Sidebar'
import Footer from '../../components/Footer'
import {useNavigate, useLocation} from 'react-router-dom'
import { GlobalContext } from '../../store/GlobalContext'
import { config } from '../../config'

const AdminPageMain = ({component}) => {
    const navigate = useNavigate()
    const {adminToken} = useContext(GlobalContext)

    useEffect (() => {
        if(adminToken === null || adminToken === undefined) navigate(`/${config.admin_path}`)
    },[adminToken, navigate])

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
              {location.pathname === `/${config.admin_path}` && (
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