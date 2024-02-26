import { combineReducers, compose, legacy_createStore as createStore } from "redux"
import { userService } from "../services/user.service.js"
import { userReducer } from "./reducers/user.reducer.js"
import { postReducer } from "./reducers/post.reducer.js"



const rootReducer = combineReducers({
    userModule: userReducer,
    postModule:postReducer
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

// console.log('store.getState():', store.getState())
window.gStore = store


// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })

