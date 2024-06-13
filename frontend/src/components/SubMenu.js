import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../store/GlobalContext'

const SubMenu = ({item}) =>{
    const [subnav, setSubnav] = useState(false)
    const {toggle} = useContext(GlobalContext)

    const showSubnav = () => setSubnav(!subnav)
    return (
        <>
            <Link className = 'sidebarLink' to = {item.path} onClick = {item.subNav && showSubnav}>
                <div> 
                    <span className = 'sidebarLabel'>{item.title}</span>
                </div>
                <div>
                    <img src={item.icon} width={30} height={30} alt=''/>
                </div>
                <div>
                    {subnav && item.subNav ? item.iconOpened: item.iconClosed}
                </div>
            </Link>
            { subnav && item.subNav.map((subItem, subKey) => {
                return (
                    <Link className="dropdown" key={subKey} to={subItem.path} onClick={window.innerWidth < 450 ? toggle :null}>
                        
                        <span className="sidebarLabel">
                            {subItem.title}
                        </span>
                        <img src={subItem.icon} width={30} height={30} alt=''/>
                    </Link>
                )
            })}
        </>
    )
}

export default SubMenu