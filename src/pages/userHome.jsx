import { useDispatch, useSelector } from "react-redux"


import PostPreviewHead from "../cmps/PostPreviewHead"
import PostPreviewAction from "../cmps/PostPreviewActions"
import PostPreviewInput from "../cmps/PostPreviewInput"
import { useEffect } from "react"
import Story from "../cmps/story"
import { setUserFollowingPosts } from "../store/actions/post.actions"
import { userService } from "../services/user.service"
import { SET_USER } from "../store/reducers/user.reducer"

export default function userHome() {

    const homePosts = useSelector(storeState => storeState.postModule.userHomePagePosts)
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const dispatch = useDispatch()

    
    useEffect(() => {
        if (loggedinUser) {
            userService.getByUsername(loggedinUser.username).then((user) => {
                dispatch({ type: SET_USER, user })
                setUserFollowingPosts()
            })
        }
    }, [])
    return (
        <>
            <div className="user-home-container">
                <Story following={loggedinUser.following} />

                <ul className="clean-list user-home-list">
                    {homePosts.map(post => <li key={post._id}>
                        <PostPreviewHead post={post} />
                        <img className="post-img" src={post.imageUrl} alt="" />
                        <PostPreviewAction post={post} />
                        <p className="post-preview-username-disaplay"><span>{post.owner.username}</span>{post.caption}</p>
                        <PostPreviewInput post={post} />
                    </li>)}
                </ul>
            </div>
        </>
    )
}