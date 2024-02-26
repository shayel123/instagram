import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { setUserFollowingPosts } from '../store/actions/post.actions.js'

const BASE_URL = 'post/'

export const postService = {
  getUserPosts,
  getUserFollowingPosts,
  addLike,
  removeLike,
  addComment,
  getById
}

function getById(id) {
  return httpService.get(BASE_URL + 'id/' + id)
}

function getUserPosts(username) {
  return httpService.get(BASE_URL + username)
}

function addLike(post) {
  return httpService.put(BASE_URL + 'addlike', post)
}
function removeLike(post) {
  return httpService.delete(BASE_URL + 'removelike', post)
}

function addComment(postId, comment) {
  const commentData = { postId, comment }
  return httpService.put(BASE_URL + 'addComment', commentData)
}


function getUserFollowingPosts() {
  return httpService.get(BASE_URL + 'homePagePosts')
}