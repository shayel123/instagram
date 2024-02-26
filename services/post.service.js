import fs from 'fs'
import { utilService } from "./utils.service.js"


const posts = utilService.readJsonFile('data/post.json')

export const postService = {
    getUserPosts,
    getUserFollowingsPosts,
    addLike,
    removeLike,
    addComment,
    getById
}

function getById(id) {
    const post = posts.find(post => post._id === id)
    return Promise.resolve(post)
}

function getUserPosts(username) {
    const userPosts = posts.filter(post => post.owner.username === username)
    return Promise.resolve(userPosts)
}
function addComment(postId, comment, loggedinUser) {
    const commentToSave = {
        txt: comment,
        _id: utilService.makeId(),
        by: {
            _id: loggedinUser._id,
            username: loggedinUser.username,
            profilePicture: loggedinUser.profilePicture
        }
    }
    const postIndex = posts.findIndex(post => post._id === postId);
    if (postIndex !== -1) {
        posts[postIndex].comments.push(commentToSave)
        return _savePostsToFile().then(() => {
            console.log("comment added successfully")
            return Promise.resolve(commentToSave)
        }).catch(err => {
            console.error("Error saving post data:", err)
            return Promise.reject(err);
        })
    } else {
        return Promise.reject("Post not found");
    }
}

function addLike(postId, loggedinUser) {
    const postIndex = posts.findIndex(post => post._id === postId);

    if (postIndex !== -1) {
        const alreadyLiked = posts[postIndex].likes.some(like => like.username === loggedinUser.username);
        if (!alreadyLiked) {
            posts[postIndex].likes.push({ _id: loggedinUser._id, username: loggedinUser.username });
            return _savePostsToFile().then(() => {
                console.log("Like added successfully");
                return Promise.resolve();
            }).catch(err => {
                console.error("Error saving post data:", err);
                return Promise.reject(err);
            });
        } else {
            return Promise.reject("User has already liked this post");
        }
    } else {
        return Promise.reject("Post not found");
    }

}
function removeLike(postId, loggedinUser) {
    const postIndex = posts.findIndex(post => post._id === postId);
    if (postIndex !== -1) {
        // Find the index of the like in the post's likes array
        const likeIndex = posts[postIndex].likes.findIndex(like => like.username === loggedinUser.username);

        if (likeIndex !== -1) {
            // Remove the like from the post's likes array
            posts[postIndex].likes.splice(likeIndex, 1);

            // Save the updated posts data to the file
            return _savePostsToFile().then(() => {
                console.log("Like removed successfully");
                return Promise.resolve();
            }).catch(err => {
                console.error("Error saving post data:", err);
                return Promise.reject(err);
            });
        } else {
            return Promise.reject("User hasn't liked this post");
        }
    } else {
        return Promise.reject("Post not found");
    }
}
function getUserFollowingsPosts(followings) {
    const promises = followings.map(user => getUserPosts(user.username))
    return Promise.all(promises)
        .then(postsByUser => postsByUser.flat())
        .then(posts => posts.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }))
}

function _savePostsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(posts, null, 2)
        fs.writeFile('data/post.json', data, (err) => {
            if (err) {
                return reject(err)
            }
            resolve()
        })
    })
}

