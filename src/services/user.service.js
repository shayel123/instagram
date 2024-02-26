import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import noProfileSvg from '../assets/imgs/no-profile-picture.svg'

const BASE_URL = 'user/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    getByUsername,
    login,
    getLoggedinUser,
    getUserFollowing,
    addFollow,
    removeFollow
}

function login({ username, password }) {
    return httpService.post(BASE_URL + 'login', { username, password })
        .then(user => {
            if (user) return _setLoggedinUser(user)
        })
}
function signup({ username, password, fullname }) {
    const user = { username, password, fullname }
    return httpService.post(BASE_URL + 'signup', user)
        .then(user => {
            if (user) return _setLoggedinUser(user)
        })

}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}
function getUserFollowing(username) {
    const following = httpService.get(BASE_URL + username + '/following')
    return following
}
function addFollow(user) {
    return httpService.put(BASE_URL + 'addFollow', user)
}
function removeFollow(user) {
    return httpService.delete(BASE_URL + 'removeFollow', user)
}

function getByUsername(username) {
    return httpService.get(BASE_URL + username)
}
function _setLoggedinUser(user) {
    // const profilePicture = user.profilePicture ? user.profilePicture : noProfileSvg
    // const userToSave = { _id: user._id, fullname: user.fullname, username: user.username, profilePicture, following: user.followings }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}

