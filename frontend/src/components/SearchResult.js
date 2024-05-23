import React from 'react'
import {Link} from 'react-router-dom'
// import PageDetail from '../pages/PageDetail'

export const SearchResult = ({result}) => {
    return (
        <div className="search-list">
                {result.map((item, index) => {
                    return(
                        <Link class="text-decoration-none d-block" key={index} to={`/pages/product/detail/${item['id']}`}>{item['name']}</Link>
                    )
                })}
        </div>
    )
}