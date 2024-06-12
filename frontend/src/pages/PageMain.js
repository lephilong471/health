import React, {useEffect, useState} from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'
import { config } from '../config'
import axios from 'axios'

const PageMain = ({component}) => {
    const location = useLocation()
    const welcome = location.pathname === '/'
    const [weather, setWeather] = useState([])
    const [clock, setClock] = useState('')

    // const clock =(new Date()).getHours()+':'+(new Date()).getMinutes()

    useEffect(() => {
        axios({
            method:'GET',
            url:'https://weatherplus.vn/api/v1/weather/now?lat=10.3645799&lng=106.6781219',
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
            }
        })
            .then(res=> setWeather(res.data.data))
            .catch(error => console.log(error))

        const t = setInterval(() => {
            const hour = (new Date()).getHours()
            const minute = (new Date()).getMinutes()
            setClock((hour > 9 ? hour : '0'+ hour) + ':' + (minute > 9 ? minute : '0' + minute))
        },1000)

        return () => clearInterval(t)

    },[])

    const background = {
        background: "linear-gradient(135deg, rgba(255,236,214,1) 0%, rgba(255,248,248,1) 25%, rgba(255,248,248,1) 75%, rgba(255,205,205,1) 100%)"
    }
    return (
        <>
         <Header />
          <div className="pageContent" style={(location.pathname === '/' || location.pathname === '/pages/support') ? background:null}>
              <Sidebar />
              {welcome && (
                <div className="welcome-container">
                    <div className="welcome-title">
                        <span>Xin chào</span>
                        <img className="heart" src={`${config.image_path}/images/heart.svg`} alt=''/>
                    </div>
                    <div className="container">
                        <div className="row my-1">
                            <div className="col-lg-6 col-12 my-1 d-flex justify-content-lg-end justify-content-center">
                                <div className="welcome-card welcard-1">
                                    <img src={`${config.image_path}/images/location.svg`} alt=''/>
                                    <div className="fw-bold">TP. Gò Công</div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12 my-1 d-flex justify-content-lg-start justify-content-center">
                                <div className="welcome-card welcard-2">
                                    <img src={`${config.image_path}/images/weather.svg`} alt=''/>
                                    <span className="fw-bold">{weather.state}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row my-1">
                            <div className="col-lg-6 col-12 my-1 d-flex justify-content-lg-end justify-content-center">
                                <div className="welcome-card welcard-3">
                                    <img src={`${config.image_path}/images/time.svg`} alt=''/>
                                    <span className="fw-bold">{clock}</span>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12 my-1 d-flex justify-content-lg-start justify-content-center">
                                <div className="welcome-card welcard-4">
                                    <img src={`${config.image_path}/images/celcius.svg`} alt=''/>
                                    <span className="fw-bold">{`${weather.temperature}°C`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <img src={`${config.image_path}/images/safe.gif`} style={{backgroundColor:"transparent"}} alt=''/> */}
                </div>
              )}
              {component}
          </div>
          <Footer/>
        </>
    )
}

export default PageMain