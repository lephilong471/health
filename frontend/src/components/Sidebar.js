import React, {useContext} from 'react'
import { SidebarData, SidebarWidthData } from './SidebarData'
import {Link} from 'react-router-dom'
import "../App.css"
import SubMenu from './SubMenu'
import { GlobalContext } from '../store/GlobalContext'
import { config } from '../config'
const Sidebar = () =>{
    // const [sidebar, setSidebar] = useState(false)
    const {closeNav, toggle} = useContext(GlobalContext)

    return (
        <>
            <div className="sidebarNav" style={{display: closeNav ? 'none': 'inline'}}>
                <div className ="sidebarWrap">
                    <Link className="navIcon" to="#">
                        <img src={`${config.image_path}/images/navbar.svg`} onClick={toggle} alt=''/>
                    </Link>

                    {SidebarData.map( (item, index) => {
                       return <SubMenu item={item} key={index}/>
                    })}

                    {window.innerWidth < 450 && (
                        SidebarWidthData.map((item,index)=>{
                            return <SubMenu item={item} key={index}/>
                    }))}
                </div>
            </div>
            
            {closeNav &&
                (
                    <div className='collapseNav' >
                        <Link className="navIcon" to="#">
                            <img src={`${config.image_path}/images/navbar.svg`} onClick={toggle} alt=''/>
                        </Link>
                        
                        {SidebarData.map( (item, index) => {
                            return (
                                <>  
                                    {item.path !== '' && (
                                        <Link className="collapseIcon" to={item.path} key={index}>
                                        <img src={config.image_path+item.icon} width={30} height={30} alt=''/>
                                        </Link>  
                                    )}

                                    {item.subNav && item.subNav.map((i, k) => {
                                        return(
                                            <Link className="collapseIcon" to={i.path} key={k}>
                                                <img src={config.image_path+i.icon} width={30} height={30} alt=''/>
                                            </Link>
                                        )
                                    })}
                                </>
                            )
                        })}

                        {window.innerWidth < 450 && (
                            SidebarWidthData.map((item,index)=>{
                                return(
                                    <>
                                        <Link className="collapseIcon" to={item.path} key={index}>
                                            <img src={config.image_path+item.icon} width={30} height={30} alt=''/>
                                        </Link>
                                    </>
                                )
                            })
                        )}
                    </div>
                )
            }

            
        </>
    )
}

export default Sidebar