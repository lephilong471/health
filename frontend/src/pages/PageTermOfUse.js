import React from 'react'

const PageTermOfUse = () => {
    return (
        <div className="text-start m-4 fs-5">
            <div>
                <h3 style={{fontFamily: 'Pacifico'}}>Dữ liệu hệ thống gồm những gì ?</h3>
                <ul>
                    <li>
                        Dữ liệu chính của hệ thống sẽ là thông tin chi tiết về các sản phẩm thuốc mà phòng khám hiện đang bán.
                    </li>
                    <li>
                        Ngoài ra, sẽ có những dữ liệu mà người dùng tương tác với hệ thống thông qua tính năng hỗ trợ
                    </li>
                </ul>
            </div>
            <div>
                <h3 style={{fontFamily: 'Pacifico'}}>Tiện ích sẵn có ?</h3>
                <ul>
                    <li>
                        Người dùng có thể tìm kiếm sản phẩm một cách nhanh chóng thông qua chức năng tìm kiếm bằng hình ảnh.
                    </li>
                    <li>
                        Chỉ cần người dùng chụp mặt trước của hộp thuốc. Hệ thống sẽ dựa vào đó mà kiểm tra xem sản phẩm hiện đang có bán trong phòng khám hay không.
                    </li>
                </ul>
            </div>
            <div>
                <h3 style={{fontFamily: 'Pacifico'}}>Có nên khám bệnh thông qua nhắn tin trên hệ thống ?</h3>
                <ul>
                    <li>
                        Hỗ trợ chỉ là một phần trong giai đoạn giải đáp thắc mắc của khách hàng. Không nên dùng để thay thế cho việc khám bệnh.
                    </li>
                    <li>
                        Khách hàng muốn khám bệnh thì hãy đến phòng khám trực tiếp để bác sĩ có thể chẩn đoán và đưa ra đơn thuốc phù hợp.
                    </li>
                </ul>
            </div>
        </div>

    )
}

export default PageTermOfUse