export default function PostDetailsCommentsList({post}){
    return     <div className="post-detils-dataPost-comments-container">
    <hr />
    <ul className="clean-list comment-list">
        <li>
            <div className="caption-comment">
                <img src={post.owner.imgUrl} alt="" />
                <p><strong>{post.owner.username}</strong>{post.caption}</p>
            </div>
        </li>
        {post.comments.map(comment => <li key={comment._id} >
            <div className="comment">
                <img src={comment.by.profilePicture} alt="" />
                <p><strong>{comment.by.username}</strong>{comment.txt}</p>
            </div>
        </li>)}
    </ul>
</div>
}