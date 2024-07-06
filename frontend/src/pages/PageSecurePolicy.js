import React from 'react'

export const PageSecurePolicy = () => {
    return (
        <div className="text-start m-4 fs-5">
            <div>
                <h3 style={{fontFamily: 'Pacifico'}}>Thông tin nào được lấy từ người dùng ?</h3>
                <ul>
                    <li>
                        Hệ thống không hề lấy bất kì thông tin cá nhân nào mà chỉ lấy các thông tin cần được hỗ trợ từ phía người dùng.
                    </li>
                    <li>
                        Nếu người dùng không gửi tin nhắn hỗ trợ thì hệ thống cũng không thực hiện chức năng gì ngoài hiển thị thông tin phòng khám.
                    </li>
                </ul>
            </div>
            <div>
                <h3 style={{fontFamily: 'Pacifico'}}>Thông tin có được bảo mật không ?</h3>
                <ul>
                    <li>Hệ thống cần có mã hỗ trợ mà người dùng đặt trước đó để hiển thị ra nội dung của cuộc trò chuyện.</li>
                    <li>Vì vậy, nếu những người dùng khác nhau vô tình đặt cùng một mã hỗ trợ thì có thể xem được nội dung cuộc trò chuyện chung với nhau (Mã hỗ trợ nên 10 ký tự trở lên)</li>
                    <li>Do đó, trong trường hợp cần thiết, hệ thống sẽ chỉ yêu cầu người dùng gửi đi những thông tin cơ bản như là: Họ tên và tình trạng bệnh để hỗ trợ.</li>
                    <li>Cuối cùng là khi đã xác định người dùng đã được hỗ trợ thông qua cuộc trò chuyện. Hệ thống sẽ xóa nội dung cuộc trò chuyện đó để đảm bảo thông tin được an toàn.</li>
                </ul>
            </div>
        </div>
    )
}

export default PageSecurePolicy