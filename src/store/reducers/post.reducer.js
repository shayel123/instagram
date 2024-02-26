import { postService } from "../../services/post.service"

export const SET_HOME_PAGE_POSTS = 'SET_HOME_PAGE_POSTS'
export const ADD_LIKE = 'ADD_LIKE'
export const REMOVE_LIKE = 'REMOVE_LIKE'
export const ADD_COMMENT = 'ADD_COMMENT'


const initialState = {
    userHomePagePosts: []
}

export function postReducer(state = initialState, action = {}) {
    let posts
    switch (action.type) {
        case SET_HOME_PAGE_POSTS:
            return { ...state, userHomePagePosts: action.posts }
        case ADD_LIKE:
            posts = state.userHomePagePosts.map(post => {
                if (post._id === action.action.postId) {
                    return {
                        ...post,
                        likes: [...post.likes, { _id: action.action.likedBy._id, username: action.action.likedBy.username }]
                    };
                }
                else return post;
            });
            return { ...state, userHomePagePosts: posts };
        case REMOVE_LIKE:
            posts = state.userHomePagePosts.map(post => {
                if (post._id === action.action.postId) {
                    const likeIndex = post.likes.findIndex(like => like._id === action.action.likedBy._id);
                    if (likeIndex !== -1) {
                        const newLikes = [...post.likes];
                        newLikes.splice(likeIndex, 1);

                        return {
                            ...post,
                            likes: newLikes
                        };

                    }
                }
                return post;
            });
            return { ...state, userHomePagePosts: posts };
        case ADD_COMMENT:
            posts = state.userHomePagePosts.map(post => {
                if (post._id === action.action.postId) {
                    return { ...post, comments: [...post.comments, action.action.comment] }
                }
                return post
            })
            console.log(posts)
            return { ...state, userHomePagePosts: posts };


        default:
            return state;
    }
}