import { postService } from "../../services/post.service.js";
import { SET_HOME_PAGE_POSTS } from "../reducers/post.reducer.js";
import { store } from "../store.js";


export function setUserFollowingPosts() {
   return postService.getUserFollowingPosts()
        .then(posts => {
            store.dispatch({ type: SET_HOME_PAGE_POSTS, posts })
            return posts
        })
        .catch(err => {
            console.log('post actions - cannot set user following posts', err)
            throw err
        })
}