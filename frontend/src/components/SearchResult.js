import React, {useContext} from 'react'
import { GlobalContext } from '../store/GlobalContext'
import {Link} from 'react-router-dom'
// import PageDetail from '../pages/PageDetail'

export const SearchResult = ({result}) => {
    const {search, setSearch} = useContext(GlobalContext)
    
    const handleClick = () => {
        setSearch('')
    }

    return (
        <div className="search-list">
                {search && search !== '' && result.map((item, index) => {
                    return(
                        <Link onClick = {handleClick} class="text-decoration-none d-block" key={index} to={`/pages/product/detail/${item['id']}`}>{item['name']}</Link>
                    )
                })}
        </div>
    )
}