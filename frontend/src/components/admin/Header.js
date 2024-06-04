import React, {useContext} from 'react'
import { GlobalContext } from '../../store/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import axios from 'axios';
import { config } from '../../config';

const Header = () => {
    const navigate = useNavigate()
    const {setAdminToken} = useContext(GlobalContext)

    const logout = () => {
        axios.get(config.proxy+"/api/admin-logout")
            .then(function(response){
                if(response.status === 200){
                    setAdminToken(null)
                    localStorage.removeItem('Access-Token')
                    navigate(`/${config.admin_path}`)
                } 
            })
            .catch(error => console.log(error))
    }
    
    return (
        <div className="admin-header">
            <div className="headerLogo">
                <img src={`${config.image_path}/images/logo.svg`} alt=''/>
            </div>
            <div className="admin-header-content">
                <BiLogOut onClick = {logout} className="logout"/>
            </div>
        </div>
    )
}

export default Header