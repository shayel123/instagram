import { useEffect, useState } from "react"
import { userService } from "../services/user.service"
import { login } from "../store/actions/user.actions"
import { useSelector } from "react-redux"
import UserHome from "./userHome"
import { setUserFollowingPosts } from "../store/actions/post.actions"
import { Outlet, useNavigate } from "react-router-dom"



export default function HomePage() {

    const loggedinUser = useSelector(storeState=>storeState.userModule.loggedinUser)
    const [formData, setFormData] = useState({ username: '', password: '' })

    // useEffect(() => {
    //     if (loggedinUser) setUserFollowingPosts()
    // }, [])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? (+value || '') : value
        setFormData((prevFormData) => ({ ...prevFormData, [field]: value }))
    }

    function onLogin(ev) {
        ev.preventDefault()
        login(formData)
            .then(() => setUserFollowingPosts())
    }

    if (!loggedinUser)
        return <form onSubmit={onLogin}>
            <label htmlFor="username">username</label>
            <input name="username" value={formData.username} onChange={handleChange} type="text" />

            <label htmlFor="password">password</label>
            <input name="password" value={formData.password} onChange={handleChange} type="text" />
            <button>login</button>
        </form>

    else return (
        <>
            <UserHome />
            <Outlet />
        </>
    )
}