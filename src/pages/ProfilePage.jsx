import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { userService } from "../services/user.service"
import { showErrorMsg } from "../services/event-bus.service"
import { postService } from "../services/post.service"
import { useDispatch, useSelector } from "react-redux"
import ProfileHead from "../cmps/ProfileHead"
import ProfilePageDisplayActions from "../cmps/ProfilePageDisplayActions"

export default function ProfilePage() {

    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const [user, setUser] = useState(null)
    const [isHovered,setIshovered] = useState(false)
    const [isFollow, setIsFollow] = useState('')
    const [userPosts, setUserPosts] = useState(null)
    const { username } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        loadUser(username)

    }, [username])


    function loadUser(username) {
        userService.getByUsername(username)
            .then(user => {
                setUser(user)
                setIsFollow(user.followers.some(follower => follower.username === loggedinUser.username))
                postService.getUserPosts(username).then(setUserPosts)
            })
            .catch((err) => {
                console.log('Had issues in user details', err)
                showErrorMsg('Cannot load user')
                // navigate('/user')
            })
    }

    if (!user || !userPosts) {
        return <div>Loading...</div>
    }


    return (<>
        <div className="profile-page">

            <ProfileHead username={username} setIsFollow={setIsFollow} loadUser={loadUser} userPosts={userPosts} user={user} isFollow={isFollow} />
            <ProfilePageDisplayActions />
            <section className="user-post-list">
                {userPosts.map(post => {
                    return  <img key={post._id} src={post.
                            imageUrl
                        } alt="" className="user-img" />



                })}
            </section>
        </div>
    </>
    )
}