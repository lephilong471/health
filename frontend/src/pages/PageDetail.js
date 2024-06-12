import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { config, formatNumber } from '../config'
import { GlobalContext} from '../store/GlobalContext'
import Loading from '../components/Loading'

const PageDetail = () =>{
    const params = useParams()
    const [data, setData] = useState([{}])
    const {closeNav} = useContext(GlobalContext)

    useEffect(() => {
        fetch(`${config.proxy}/api/product-detail/${params.id}`).then(res => res.json())
                            .then(data => setData(data[0]))
    },[params.id])

    function checkType(type){
        switch(type){
            case 0: return 'Nhãn khoa'
            case 1: return 'Nhi khoa'
            default: return 'Sản phẩm khác'
        }
    }
    return (
        <>
            {Object.keys(data).length > 1 ? (
                <div className="container position-relative mx-0 py-4"
                style={window.innerWidth > 450 ? {left: closeNav ? '80px' : '280px'}: {left: '80px'}}
            >
                
                <div class="row">
                    <div class="col-xxl-4 col-lg-4 col-md-6 col-sm-10 col-10 text-center my-2">
                        <img width={200} class="border border-info" src={config.image_path+data['image_url']} alt=''/>
                    </div>
                    <div class="col-xxl-6 col-lg-6 col-md-4 col-sm-10 col-10 text-start my-2">
                        <h3>{data['detail']}</h3>
                        <h4>Giá:  <span className="text-primary">{formatNumber(data['price'])}</span> </h4>
                        <h4>Loại: {checkType(data['type'])}</h4>
                    </div>
                    <div class="col-10 my-2 text-start">
                        <h3>Mô tả sản phẩm</h3>
                        <div style={{fontSize: '18px'}} dangerouslySetInnerHTML={{__html:data['description']}}/>
                    </div>
                </div>
            </div>
            ):(
                <Loading/>
            )}
        </>
    )
}

export default PageDetail