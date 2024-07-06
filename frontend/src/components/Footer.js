import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
    return (
        <div className="footer">
            <div>2024</div>
            <Link className="text-decoration-none text-white" to="/pages/term-of-use">Điều khoản sử dụng</Link>
            <Link className="text-decoration-none text-white" to="/pages/secure-policy">Chính sách bảo mật</Link>
        </div>
    )
}

export default Footer