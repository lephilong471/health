import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const PageIntroduce = ({component}) => {
    return (
        <>
            <Header/>
            <div className="pageContent">
                {component}
            </div>
            <Footer/>
        </>
      
    )
}

export default PageIntroduce