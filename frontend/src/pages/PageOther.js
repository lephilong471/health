import React, {useState, useEffect, useContext} from 'react'
import { config, formatNumber } from '../config'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'
import { GlobalContext } from '../store/GlobalContext'

const PageOther = () => {
    const [data, setData] = useState([{}])
    const {closeNav} = useContext(GlobalContext)

    useEffect(() => {
        fetch(config.proxy+"/api/product-other").then(res => res.json())
                                            .then(data => setData(data))
    },[])

    return (
        <div className="container position-relative mx-0"
            style={window.innerWidth > 450 ? {left: closeNav ? '80px' : '280px'}: {left: '80px'}}
        >
            <div className="row">
                    {data.map((item, index) => {
                        return (
                            <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
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
                    })}
            </div>
    </div>
    )
}

export default PageOther