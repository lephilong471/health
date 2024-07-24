import React, {useState, useEffect, useContext} from 'react'
import { config, formatNumber } from '../config'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'
import { GlobalContext } from '../store/GlobalContext'
import Loading from '../components/Loading'

const PageOther = () => {
    const [data, setData] = useState([{}])
    const {closeNav} = useContext(GlobalContext)

    useEffect(() => {
        fetch(config.proxy+"/api/product-other").then(res => res.json())
                                            .then(data => setData(data))
    },[])

    return (
        <div className="container position-relative mx-0"
            style={window.innerWidth > 450 ? (closeNav ? {left: '80px', width: 'calc(100vw - 80px)'} : {left: '240px', width: 'calc(100vw - 240px)'})
            :
            {left: '0px', width: '100vw'}}
        >
            <div className="row">
                {Object.keys(data).length > 1 ? (
                    data.map((item, index) => {
                        return (
                            <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center" key={index}>
                                <Link class="text-decoration-none" to={`/pages/product/detail/${item.id}`}>
                                    <Card>    
                                    <Card.Img variant="top" src={config.image_path+item['image_url']} />
                                    <Card.Body>
                                        <Card.Title>{item['name']}</Card.Title>
                                        <Card.Text className = "fw-bold text-primary">
                                            {formatNumber(item['price'])}
                                        </Card.Text>
                                    </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                        )
                    })
                ):(
                    <Loading/>
                )}
            </div>
        </div>
    )
}

export default PageOther