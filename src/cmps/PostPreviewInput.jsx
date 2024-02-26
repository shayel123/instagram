import { useState } from "react"
import { useDispatch } from "react-redux"
import { postService } from "../services/post.service"
import { ADD_COMMENT } from "../store/reducers/post.reducer"
import { useNavigate } from "react-router-dom"

export default function PostPreviewInput({ post }) {
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function handleCommentInput({ target }) {
        setComment(target.value)
    }

    function onAddComment(postId) {
        postService.addComment(postId, comment)
            .then((commentToSave) => {
                dispatch({ type: ADD_COMMENT, action: { postId, comment: commentToSave } })
                setComment('')
            }).catch(err => console.log(err))
    }



    return <div className="post-preview-input-container">
        <p onClick={() => navigate(`/p/${post._id}`)}>{post.comments.length ? `View all ${post.comments.length} comments` : null}</p>
        <div className="input-element-post-preview">
            <input onChange={handleCommentInput} value={comment} type="text" placeholder="Add a comment..." />
            <span className={comment.length ? '' : 'hide'} onClick={() => onAddComment(post._id)}>Post</span>
        </div>
        <hr />

    </div>

}