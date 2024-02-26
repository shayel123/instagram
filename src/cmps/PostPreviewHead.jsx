import { useNavigate } from "react-router-dom"
import postsMoreSvg from '../assets/imgs/postsMore.svg'
import ms from 'ms'



export default function PostPreviewHead({ post }) {
    const navigate = useNavigate()
    return <div onClick={() => navigate(`/${post.owner.username}`)} className="post-owner-head">
        <div className="flex align-center post-head-user-data">
            <img src={post.owner.imgUrl} alt="" />
            <strong >
                {post.owner.username}
            </strong>

            <span> | </span>
            <span>

                {ms(new Date() - new Date(post.createdAt))}
            </span>
        </div>
        <img src={postsMoreSvg} alt="" />
    </div>
}