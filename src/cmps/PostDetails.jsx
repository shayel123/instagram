import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { postService } from "../services/post.service"
import { useSelector } from "react-redux"
import PostDetailsData from "./PostDetailsData"

export default function PostDetails() {
    const [post, setPost] = useState(null)
    const homePosts = useSelector(storeState => storeState.postModule.userHomePagePosts)
    const { postId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        loadPost(postId)
        return () => {
            document.body.style.overflow = '';

        }
    }, [postId, homePosts])

    function loadPost(postId) {
        postService.getById(postId)
            .then(setPost)

    }

    if (!post) return <h1>...loading</h1>
    return <div  className="post-details-container">
        <div onClick={() => navigate(-1)} className="exit-post-details">X</div>
      <PostDetailsData post={post} />
    </div>
}