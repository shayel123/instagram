import searchSvg from '../assets/imgs/search.svg';
import exploreSvg from '../assets/imgs/explore.svg';
import reelsSvg from '../assets/imgs/reels.svg';
import messagesSvg from '../assets/imgs/messages.svg';
import notificationsSvg from '../assets/imgs/notifications.svg';
import createSvg from '../assets/imgs/create.svg';
import homeSvg from '../assets/imgs/home.svg';
import threadsSvg from '../assets/imgs/threads.svg';
import moreSvg from '../assets/imgs/more.svg';
import NavbarItem from '../ui/NavbarItem';
import Logo from '../ui/logo';
import { useNavigate } from "react-router-dom"

import { useSelector } from "react-redux"


export default function SideBar() {
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    return (
        <>
            <Logo />
            <ul className='clean-list side-bar-list'>
                <NavbarItem onClick={()=>navigate('/')} src={homeSvg} txt='Home' />
                <NavbarItem src={searchSvg} txt='Search' />
                <NavbarItem src={exploreSvg} txt='Explore' />
                <NavbarItem src={reelsSvg} txt='Reels' />
                <NavbarItem src={messagesSvg} txt='Messages' />
                <NavbarItem src={notificationsSvg} txt='Notifications' />
                <NavbarItem src={createSvg} txt='Create' />
                <NavbarItem onClick={()=>navigate(`/${user.username}`)} src={user?.profilePicture} txt='Profile' />

            </ul>

            <ul className='clean-list side-bar-bottom-list'>
                <NavbarItem src={threadsSvg} txt='Threads' />
                <NavbarItem src={moreSvg} txt='More' />

            </ul>
        </>

    )
}