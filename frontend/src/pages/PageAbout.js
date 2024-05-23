import React from 'react'
import {Link} from 'react-router-dom'

const PageAbout = () => {
    return (
        <div className="container">
            <div class="row">
                <div class="col-xxl-4 col-lg-4 col-sm-6 col-12 d-flex justify-content-center my-3">
                    <div className="card-about card-1">
                        <div className="front">
                            Website
                        </div>
                        <div className="back">
                            Bacsie.com là trang web cung cấp các thông tin về phòng khám mắt Bác sĩ Lê Thành E
                        </div>
                    </div>
                </div>
                <div class="col-xxl-4 col-lg-4 col-sm-6 col-12 d-flex justify-content-center my-3">
                    <div className="card-about card-2">
                        <div className="front">
                            Bác sĩ
                        </div>
                        <div className="back">
                            <ul>
                                <li>Bác sĩ Lê Thành E - (Chuyên khoa Mắt)</li>
                                <li>Bác sĩ Nguyễn Thị Mỹ Linh - (Chuyên khoa Nhi)</li>
                            </ul> 
                        </div>
                    </div>
                </div>
                <div class="col-xxl-4 col-lg-4 col-sm-6 col-12 d-flex justify-content-center my-3">
                    <div className="card-about card-3">
                        <div className="front">
                            Hỗ trợ
                        </div>
                        <div className="back">
                            <div>Website có hỗ trợ giải đáp các câu hỏi của khách hàng.
                            Mọi thắc mắc có thể đặt ngay tại phần <Link className="text-info fw-bold" to="/pages/support/"> Hỗ trợ </Link></div>
  
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div class="col-xxl-4 col-lg-4 col-sm-6 col-12 d-flex justify-content-center my-3">
                    <div className="card-about card-4">
                        <div className="front">
                            Sản phẩm
                        </div>
                        <div className="back">
                            <ul>
                                <li>
                                    Bệnh về Mắt: Thuốc nhỏ mắt, viên uống sáng mắt, ...
                                </li>
                                <li>
                                    Bệnh về Nhi: Thuốc hạ sốt, siro ho, kháng sinh, khó tiêu, dị ứng, ...
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-xxl-4 col-lg-4 col-sm-6 col-12 d-flex justify-content-center my-3">
                    <div className="card-about card-5">
                        <div className="front">
                            Địa chỉ
                        </div>
                        <div className="back">
                            Số 4, Nguyễn Văn Côn, Khu phố 2, Phường 2, Thành phố Gò Công, Tỉnh Tiền Giang.
                        </div>
                    </div>
                </div>
                <div class="col-xxl-4 col-lg-4 col-sm-6 col-12 d-flex justify-content-center my-3">
                    <div className="card-about card-6">
                        <div className="front">
                            Thời gian làm việc
                        </div>
                        <div className="back">
                            <ol>
                                <li>Ngày trong tuần</li>
                                <ul>
                                    <li>Sáng: 6h00 - 7h00</li>
                                    <li>Trưa: 11h30 - 12h00</li>
                                    <li>Chiều: 17h00 - 19h00</li>
                                </ul>
                                <li>Ngày cuối tuần</li>
                                <ul>
                                    <li>Sáng: 6h00 - 12h00</li>
                                    <li>Chiều: 17h00 - 19h00</li>
                                </ul>
                            </ol>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageAbout