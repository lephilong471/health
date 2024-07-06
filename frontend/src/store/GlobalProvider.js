import React,  { useState } from 'react'
import { GlobalContext } from './GlobalContext'

export const GlobalProvider = ({children}) => {
    const [closeNav, setCloseNav] = useState(false)
    const [search, setSearch] = useState('')
    const [showUpload, setShowUpload] = useState(false)
    const [adminToken, setAdminToken] = useState(localStorage.getItem('Access-Token'))

    const toggle = () => {
        setCloseNav(!closeNav)
    }

    return (
        <GlobalContext.Provider value = {{closeNav, toggle, search, setSearch, adminToken, setAdminToken,
            showUpload, setShowUpload
        }}>
            {children}
        </GlobalContext.Provider>
    )
}