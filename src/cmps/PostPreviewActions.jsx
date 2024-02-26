import likeSvg from '../assets/imgs/like.svg'
import likedSvg from '../assets/imgs/liked.svg'
import commentSvg from '../assets/imgs/comment.svg'
import sendPostSvg from '../assets/imgs/sendPost.svg'
import savePostSvg from '../assets/imgs/savePost.svg'
import { useDispatch, useSelector } from 'react-redux'
import { postService } from "../services/post.service"
import { ADD_LIKE, REMOVE_LIKE } from "../store/reducers/post.reducer"
import { useEffect, useState } from 'react'

export default function PostPreviewAction({ post }) {
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const [isLiked, setIsLiked] = useState(post.likes.some(like => like._id === loggedinUser._id))
    const dispatch = useDispatch()

    function onAddLike(post) {
        const action = { likedBy: { _id: loggedinUser._id, username: loggedinUser.username }, postId: post._id }
        if (!isLiked) {
            postService.addLike(post)
                .then(() => {
                    dispatch({ type: ADD_LIKE, action })
                    setIsLiked(prev => !prev)
                }
                ).catch(err => console.log(err))

        } else postService.removeLike(post)
            .then(() => {
                dispatch({ type: REMOVE_LIKE, action })
                setIsLiked(prev => !prev)
            })

    }

    return <>
        <section className="post-actions">
            <div>
                <img onClick={() => onAddLike(post)} className='margin' src={isLiked ? likedSvg : likeSvg} alt="" />
                <img className="margin" src={commentSvg} alt="" />
                <img className="margin" src={sendPostSvg} alt="" />
            </div>
            <div>
                <img src={savePostSvg} alt="" />
            </div>
        </section>
        <p className='post-actions-like-counter'>{post.likes.length} likes</p>
    </>
}