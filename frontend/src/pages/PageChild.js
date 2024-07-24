import React, {useState, useEffect, useContext} from 'react'
import Card from 'react-bootstrap/Card'
import { config, formatNumber } from '../config'
import { GlobalContext} from '../store/GlobalContext'
import {Link} from 'react-router-dom'
import Loading from '../components/Loading'

const PageChild = () => {
    const [data, setData] = useState([{}])
    const {closeNav} = useContext(GlobalContext)

    useEffect(() => {
        fetch(config.proxy+"/api/product-child").then(res => res.json())
                            .then(data => setData(data))
    },[])

    return (
        <>
            {Object.keys(data).length > 1 ? (
                <div className="container position-relative mx-0" 
                    style={window.innerWidth > 450 ? (closeNav ? {left: '80px', width: 'calc(100vw - 80px)'} : {left: '240px', width: 'calc(100vw - 240px)'})
                    :
                    {left: '0px', width: '100vw'}}
                >
                <div className="row">         
                    {data.map((item, index) => {
                        return (
                            <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center" key={index}>
                            <Link class="text-decoration-none" to={`/pages/product/detail/${item.id}`}>
                                <Card>
                                <Card.Img variant="top" src={config.image_path+item['image_url']} />
                                <Card.Body>
                                    <Card.Title>{item['name']}</Card.Title>
                                    <Card.Text className="fw-bold text-primary">
                                        {formatNumber(item['price'])}
                                    </Card.Text>
                                    
                                </Card.Body>
                                </Card>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
            ):(
                <Loading/>
            )}
        </>
        
    )
}

export default PageChild