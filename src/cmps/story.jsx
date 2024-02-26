
export default function Story({following}){
    return <div className="story-container">
        <ul className="clean-list story-list">
            {following?.map(follower=><li key={follower.username}>
                <img src={follower.profilePicture} alt="" />
                <p>{follower.username}</p>
            </li>)}
        </ul>
    </div>
}