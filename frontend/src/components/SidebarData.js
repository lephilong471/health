import React from 'react'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
// import { AiOutlineMedicineBox } from "react-icons/ai"
// import { ImEye } from "react-icons/im"
// import { MdChildCare } from "react-icons/md"
// import { RiApps2AddLine } from "react-icons/ri"
// import { BiSupport } from "react-icons/bi"
// import { TbHealthRecognition } from "react-icons/tb"

export const SidebarData = [
    {
        title: 'Sản phẩm',
        path: '',
        icon: "/images/drug.svg",
        iconClosed: <IoIosArrowDown />,
        iconOpened: <IoIosArrowUp />,
        subNav: [
            {
                title: 'Nhãn khoa',
                path: '/pages/eyes',
                icon: "/images/eye.svg"
            },
            {
                title: 'Nhi khoa',
                path: '/pages/child',
                icon:  "/images/child.svg"
            },
            {
                title: 'Khác',
                path: '/pages/other',
                icon:  "/images/other.svg"
            }
        ]
    },
    {
        title: 'Dịch vụ',
        path: '/pages/service',
        icon: "/images/heal.svg"
    },
    {
        title: 'Hỗ trợ',
        path: '/pages/support',
        icon: "/images/support.svg"
    }
]

export const SidebarWidthData = [
    {
        title: 'Về bacsie.com',
        path: '/pages/about',
        icon: '/images/about.svg'
    },
    {
        title: 'Thông tin khám',
        path: '/pages/info',
        icon: '/images/info.svg'
    }
]