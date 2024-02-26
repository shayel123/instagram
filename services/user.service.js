import fs from 'fs'
import Cryptr from 'cryptr'
import { utilService } from "./utils.service.js"

const cryptr = new Cryptr(process.env.SECRET || 'Secret-Puk-1234')
const users = utilService.readJsonFile('data/user.json')

export const userService = {
    getByUsername,
    getLoginToken,
    validateToken,
    add,
    checkLogin,
    getById,
    addFollow,
    removeFollow
    // getUserFollowings
}


function checkLogin({ username, password }) {
    var user = users.find(u => u.username === username && u.login.password === password)
    if (user) {
        // mini-user:
        user = {
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePicture: user.profilePicture || null,
            bio: user.bio,
            followers:user.followers,
            following:user.following,
            location:user.location
            // score: user.score,
            // isAdmin: user.isAdmin
        }
    }
    
    return Promise.resolve(user)
}

// getUserFollowings()


function getByUsername(username) {
    const user = users.find(user => user.username === username)
    return Promise.resolve(user)
}

function getLoginToken(user) {
    return cryptr.encrypt(JSON.stringify(user))
}

function getById(userId) {
    var user = users.find(user => user._id === userId)
    if (user) {
        user = {
            _id: user._id,
            fullName: user.fullName,
            username: user.username
        }
    }
    return Promise.resolve(user)
}

function validateToken(loginToken) {
    if (!loginToken) return null
    const json = cryptr.decrypt(loginToken)
    const loggedinUser = JSON.parse(json)
    return loggedinUser
}
function addFollow(loggedinUser, userToFollow) {
    // Find the index of the logged-in user in the users array
    const loggedInIndex = users.findIndex(user => user._id === loggedinUser._id);
    // Find the index of the user to follow in the users array
    const userToFollowIndex = users.findIndex(user => user._id === userToFollow._id);
    
    if (loggedInIndex !== -1 && userToFollowIndex !== -1) {
        // Add the user to follow to the following array of the logged-in user
        users[loggedInIndex].following.push({ _id: userToFollow._id, username: userToFollow.username,profilePicture:userToFollow.profilePicture });
        // Add the logged-in user to the followers array of the user to follow
        users[userToFollowIndex].followers.push({ _id: loggedinUser._id, username: loggedinUser.username,profilePicture:userToFollow.profilePicture });
        
        // Save the updated user data to the file
        return _saveUsersToFile().then(() => {
            console.log("Follow added successfully");
            return Promise.resolve();
        }).catch(err => {
            console.error("Error adding follow:", err);
            return Promise.reject(err);
        });
    } else {
        return Promise.reject("User or user to follow not found");
    }
}
function removeFollow(loggedinUser,userToUnfollow){
    // Find the index of the logged-in user in the users array
    const loggedInIndex = users.findIndex(user => user._id === loggedinUser._id);
    // Find the index of the user to unfollow in the users array
    const userToUnfollowIndex = users.findIndex(user => user._id === userToUnfollow._id);

    if (loggedInIndex !== -1 && userToUnfollowIndex !== -1) {
        // Remove the user to unfollow from the following array of the logged-in user
        users[loggedInIndex].following = users[loggedInIndex].following.filter(following => following._id !== userToUnfollow._id);
        // Remove the logged-in user from the followers array of the user to unfollow
        users[userToUnfollowIndex].followers = users[userToUnfollowIndex].followers.filter(follower => follower._id !== loggedinUser._id);

        // Save the updated user data to the file
        return _saveUsersToFile().then(() => {
            console.log("Follow removed successfully");
            return Promise.resolve();
        }).catch(err => {
            console.error("Error removing follow:", err);
            return Promise.reject(err);
        });
    } else {
        return Promise.reject("User or user to unfollow not found");
    }
}
function add({ email = '', fullname, username, password, bio, profilePicture = 'C:\\Users\\USER\\Desktop\\Instagram\\assets\\blank-profile-picture.png' }) {

    const user = {
        _id: utilService.makeId(),
        fullname,
        username,
        bio,
        profilePicture,
        followers: [],
        following: [],
        login: {
            email,
            password
        },
        posts: []
    }

    users.push(user)
    return _saveUsersToFile().then(() => ({ _id: user._id, username: user.username }))
}

function _saveUsersToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(users, null, 2)
        fs.writeFile('data/user.json', data, (err) => {
            if (err) {
                return reject(err)
            }
            resolve()
        })
    })
}

