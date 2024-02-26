import PostPreviewHead from "./PostPreviewHead"
import PostPreviewAction from "./PostPreviewActions"
import PostPreviewInput from "./PostPreviewInput"
import PostDetailsImg from "./PostDetailsImg"
import PostDetailsCommentsList from "./PostDetailsCommentsList"


export default function PostDetailsData({ post }) {
    return <div className="post-details">
        <PostDetailsImg post={post} />
        <div className="post-details-dataPost-container">
            <PostPreviewHead post={post} />
            <PostDetailsCommentsList post={post} />
            <PostPreviewAction post={post} />
            <PostPreviewInput post={post} />
        </div>

    </div>
}