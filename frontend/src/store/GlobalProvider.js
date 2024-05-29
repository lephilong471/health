import React,  { useState } from 'react'
import { GlobalContext } from './GlobalContext'

export const GlobalProvider = ({children}) => {
    const [closeNav, setCloseNav] = useState(false)
    const [search, setSearch] = useState('')

    const toggle = () => {
        setCloseNav(!closeNav)
    }

    return (
        <GlobalContext.Provider value = {{closeNav, toggle, search, setSearch}}>
            {children}
        </GlobalContext.Provider>
    )
}