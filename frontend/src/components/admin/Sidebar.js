import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import { GlobalContext } from '../../store/GlobalContext'
import { config } from '../../config'

const Sidebar = () => {
    // const [show, setShow] = useState(false)
    const {closeNav, toggle} = useContext(GlobalContext)
    // const handleShow = () => setShow(!show)

    return (
        <>
        <div className="sidebarNav" style={{display: closeNav ? 'none': 'inline'}}>
                <div className ="sidebarWrap">
                    <Link className="navIcon" to="#">
                        <img src={`${config.image_path}/images/navbar.svg`} onClick={toggle} alt=''/>
                    </Link>

                    {SidebarData.map( (item, index) => {
                       return (
                            <Link className = 'sidebarLink' key={index} to = {item.path}>
                                <div> 
                                    <span className = 'sidebarLabel'>{item.title}</span>
                                </div>
                                <div>
                                    <img src={config.image_path+item.icon} width={30} height={30} alt=''/>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
            {closeNav &&
                (
                    <div className='collapseNav'>
                        <Link className="navIcon" to="#">
                            <img src={`${config.image_path}/images/navbar.svg`} onClick={toggle} alt=''/>
                        </Link>
                        
                        {SidebarData.map( (item, index) => {
                            return (
                                <>
                                    <Link className="collapseIcon" to={item.path} key={index}>
                                        <img src={config.image_path+item.icon} width={30} height={30} alt=''/>
                                    </Link>
                                </>
                            )
                        })}
                    </div>
                )
            }
        </>
    )
}

export default Sidebar