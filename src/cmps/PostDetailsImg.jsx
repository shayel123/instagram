export default function PostDetailsImg({post}){
    return     <div className="post-details-img-container"
    style={{ backgroundImage: `url(${post.imageUrl})` }}>

</div>
}