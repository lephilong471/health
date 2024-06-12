import React, {useState, useContext} from 'react'
import "../../assets/Admin.css"
import axios from 'axios'
import { config } from '../../config'
import { useNavigate } from 'react-router-dom'
import AdminPageMain from '../../pages/admin/AdminPageMain'
import { GlobalContext } from '../../store/GlobalContext'

const AdminLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    
    const {adminToken, setAdminToken} = useContext(GlobalContext)
    // const token = localStorage.getItem('Access-Token')
    
    const handleSubmit = () => {
        if(username === '' || password === '') alert('Please fill your information')
        else{
            axios.post(config.proxy+'/api/admin-login', 
            { 
                username: username,
                password: password
            })
        .then(function(res){
            if(res.status === 200){
                setAdminToken(res.data.token)
                localStorage.setItem('Access-Token',res.data.token)
                setUsername('')
                setPassword('')
            } 
            navigate(`/${config.admin_path}`)
        })
        .catch(error => {
            console.log(error)
            alert('Unauthorized!')
            })
        }   
    }

    return (
         <>
            {adminToken === null || adminToken === undefined ? (
                <div className="admin-background">
                <form className="admin-login-form">
                    <div className="header-logo">
                        <img width={75} src={`${config.image_path}/images/logo.svg`} alt=''/>
                    </div>
                    <input className="input" type="text"  value={username}  onChange = {(e) => setUsername(e.target.value)}placeholder="Username" require="true"/>
                    <input className="input" type="password" value={password} onChange = {(e) => setPassword(e.target.value)} placeholder="Password" require="true"/>
                    <button className="login-btn" type="button" onClick={handleSubmit}>Login</button>
                </form>
                </div>
            ):
            (
                <AdminPageMain/>
            )}

           
        </>
       
    )
}

export default AdminLogin