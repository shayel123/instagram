import { userService } from "../../services/user.service.js";

export const SET_USER = 'SET_USER'
export const ADD_FOLLOW = 'ADD_FOLLOW'
export const REMOVE_FOLLOW = 'REMOVE_FOLLOW'

const initialState = {
    loggedinUser: userService.getLoggedinUser()
}

export function userReducer(state = initialState, action = {}) {
    let user
    switch (action.type) {
        // User
        case SET_USER:
            return { ...state, loggedinUser: action.user }
        case ADD_FOLLOW:
            user = state.loggedinUser
            user.following.push(action.userToSave)
            return { ...state, loggedinUser: user }
        case REMOVE_FOLLOW:
            user = state.loggedinUser
            user.following = user.following.filter(follower => follower._id !== action.userToRemove._id)
            console.log('after cahnge',user)
            return { ...state, loggedinUser: user }
        default:
            return state;
    }
}