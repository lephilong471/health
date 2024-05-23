import React, {useState, useEffect, useContext} from 'react'
import { config, formatNumber } from '../config'
import Card from 'react-bootstrap/Card'
import { GlobalContext } from '../store/GlobalContext'
import {Link} from 'react-router-dom'

const PageEyes = () => {
    const [data, setData] = useState([{}])
    const {closeNav} = useContext(GlobalContext)

    useEffect(() => {
        fetch(config.proxy+"/api/product-eyes").then(res => res.json())
                            .then(data => setData(data))
    },[])

    const deviceWidth = window.innerWidth
    // const preprocess = (fetch_data) => {
    //     let result = []
    //     fetch_data.forEach(i => {
    //         let image_url = '../assets/'+i[3]
    //         result.push(
    //             {
    //                 'id':  i[0],
    //                 'name': i[1],
    //                 'detail': i[2],
    //                 'image_url': require(image_url),
    //                 'price': i[4],
    //                 'description': i[5],
    //                 'type': i[6]
    //             }
    //         )
    //     });
    //     return result
    // }
    // console.log(preprocess(data))
    // console.log(data)
    return (
        <div className="container position-relative mx-0"
            style={deviceWidth > 450 ? {left: closeNav ? '80px' : '280px'}:{left: '80px'}}
        >
            <div className="row">
              
                    {data.map((item, index) => {
                        return (
                            <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                <Link class="text-decoration-none" to={`/pages/product/detail/${item.id}`}>
                                    <Card>
                                    <Card.Img variant="top" src={config.image_path+item['image_url']}/>
                                    <Card.Body>
                                        <Card.Title className="text-nowrap">{item['name']}</Card.Title>
                                        <Card.Text className="text-primary fw-bold">
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

export default PageEyes