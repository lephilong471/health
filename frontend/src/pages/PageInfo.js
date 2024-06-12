import React from 'react'
import Card from 'react-bootstrap/Card'

const PageInfo = () => {
    return (
        <div className="my-2">
            <div>
                <h2 style={{fontFamily: 'Pacifico'}}>Bảng giá khám bệnh</h2>
                <h4 className="fw-bold fst-italic text-primary">30.000 đồng / 1 lần khám</h4>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-12">
                        <Card className="w-auto border-secondary">
                            <Card.Body>
                                <Card.Title className="text-nowrap fs-2" style={{fontFamily: 'Pacifico'}}>Khám mắt</Card.Title>
                                <Card.Text className="fs-5">
                                    <p>Viêm kết mạc, Viêm giác mạc</p>
                                    <p>Xuất huyết kết mạc</p>
                                    <p>Đục thủy tinh thể</p>
                                    <p>Mổ chắp, lấy dị vật giác mạc</p>
                                    <p>Cận thị, loạn thị, viễn thị</p>
                                    <p>Soi đáy mắt</p>
                                    <p>...</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-lg-6 col-12">
                        <Card className="w-auto border-primary">
                            <Card.Body>
                                <Card.Title className="text-nowrap fs-2" style={{fontFamily: 'Pacifico'}}>Khám nhi</Card.Title>
                                <Card.Text className="fs-5">
                                    <p>Đau đầu, chóng mặt, buồn nôn</p>
                                    <p>Đầy hơi, khó tiêu</p>
                                    <p>Sốt, ho, sổ mũi</p>
                                    <p>Viêm da dị ứng</p>
                                    <p>Tiêu chảy</p>
                                    <p>Biếng ăn</p>
                                    <p>...</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageInfo