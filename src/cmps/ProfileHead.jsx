import { useDispatch } from "react-redux"
import { userService } from "../services/user.service"
import { ADD_FOLLOW, REMOVE_FOLLOW } from "../store/reducers/user.reducer"

export default function ProfileHead({loadUser,setIsFollow,user, isFollow, userPosts,username }) {
    const dispatch = useDispatch()
    function onAddFollower() {
        if (!isFollow) {
            return userService.addFollow(user)
                .then(() => {
                    const userToSave = { _id: user._id, username: user.username, profilePicture: user.profilePicture }
                    dispatch({ type: ADD_FOLLOW, userToSave })
                    setIsFollow(true)
                    loadUser(username)
                })
        } else {
            console.log('here ')
            return userService.removeFollow(user)
                .then(() => {
                    console.log(user)
                    const userToRemove = { _id: user._id }
                    dispatch({ type: REMOVE_FOLLOW, userToRemove })
                    setIsFollow(false)
                    loadUser(username)
                }).catch(err => console.log(err))

        }
    }


    return <section className="profile-head">
        <div className="profile-img-container">
            <img src={user.profilePicture} alt="" />
        </div>
        <div className="profile-details-container" >
            <div className="user-head" >
                <span>{user.username}</span>
                <div className="buttons-container">
                    <button className="follow-btn" onClick={() => onAddFollower()}>{isFollow ? 'Following' : 'Follow'}</button>
                    <button className="meseges-btn">Message</button>
                </div>
            </div>
            <div className="user-data-container flex" >
                <span>{userPosts.length} posts</span>
                <span>{user.followers.length} followers</span>
                <span>{user.following.length} following</span>
            </div>
            <div>
                <p>{user.bio}</p>
            </div>
        </div>
    </section>
}