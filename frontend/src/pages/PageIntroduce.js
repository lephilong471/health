import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {useLocation} from 'react-router-dom'

const PageIntroduce = ({component}) => {
    const location = useLocation()
    console.log(location.pathname === '/pages/term-of-use' || location.pathname === 'pages/secure-policy')
    const style= {
        background:"#F7FFFD"
    }
    return (
        <>
            <Header/>
            <div className="pageContent" 
                style={(location.pathname === '/pages/term-of-use' || location.pathname === 'pages/secure-policy') ? style:null}>
                {component}
            </div>
            <Footer/>
        </>
      
    )
}

export default PageIntroduce