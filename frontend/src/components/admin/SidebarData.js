// import React from 'react'
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { config } from "../../config"

export const SidebarData = [
    {
        title: 'Quản lý',
        path: `/${config.admin_path}/pages/all-products`,
        icon: '/images/drug.svg'
    },
    {
        title: 'Tư vấn',
        path: `/${config.admin_path}/pages/support`,
        icon: '/images/support.svg',
    }
]