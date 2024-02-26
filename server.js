import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


import { loggerService } from './services/logger.service.js'
import { userService } from './services/user.service.js'
import { postService } from './services/post.service.js'


const app = express()
app.use(cookieParser())
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    // Express serve static files on production environment
    app.use(express.static(path.resolve(__dirname, 'public')))
    console.log('__dirname: ', __dirname)
} else {
    // Configuring CORS
    const corsOptions = {
        // Make sure origin contains the url your frontend is running on
        origin: [
            'http://127.0.0.1:5173',
            'http://localhost:5173',
            'http://127.0.0.1:3000',
            'http://localhost:3000',
            'http://127.0.0.1:8080',
            'http://localhost:8080',
        ],
        credentials: true
    }
    app.use(cors(corsOptions))
}

app.get('/', (req, res) => {
    res.send('<h1>Hello and welcome to my server!</h1>')
})


app.get('/api/user/:username', (req, res) => {
    const { username } = req.params
    userService.getByUsername(username)
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            loggerService.error('Cannot get car', err)
            res.status(400).send('Cannot get car')
        })
})
app.get('/api/user/id/:userId', (req, res) => {
    const { userId } = req.params
    userService.getById(userId)
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            loggerService.error('Cannot get car', err)
            res.status(400).send('Cannot get car')
        })
})

app.post('/api/auth/signup', (req, res) => {
    const credentials = req.body
    userService.add(credentials)
        .then(user => {
            const loginToken = userService.getLoginToken(user)
            res.cookie('loginToken', loginToken)
            res.send(user)
        })
        .catch(err => {
            loggerService.error('Cannot signup', err)
            res.status(400).send('Cannot signup')
        })
})
app.post('/api/user/login', (req, res) => {
    const credentials = req.body
    userService.checkLogin(credentials)
        .then(user => {
            if (user) {
                const loginToken = userService.getLoginToken(user)
                res.cookie('loginToken', loginToken)
                res.send(user)
            } else {
                res.status(401).send('Invalid Credentials')
            }
        })
})

app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('loginToken')
    res.send('Loggedout..')
})
app.put('/api/user/addFollow', (req, res) => {
    const { loginToken } = req.cookies
    const userToFollow = req.body
    const loggedinUser = userService.validateToken(loginToken)
    userService.addFollow(loggedinUser, userToFollow)
        .then(res.send('success'))
        .catch(err => console.log(err))

})
app.delete('/api/user/removeFollow', (req, res) => {
    const { loginToken } = req.cookies
    const userToUnFollow = req.body
    const loggedinUser = userService.validateToken(loginToken)
    userService.removeFollow(loggedinUser, userToUnFollow)
        .then(res.send('success'))
        .catch(err => console.log(err))

})

// app.get('/api/user/:username/following', (req, res) => {
//     const { username } = req.params
//     // console.log(username)
//     userService.getByUsername(username).then(user => {
//         const followings = user.following
//         console.log(followings)
//         res.send(followings)
//     })
// })

// posts/////////////////////////

app.get('/api/post/homePagePosts', (req, res) => {
    const { loginToken } = req.cookies
    const user = userService.validateToken(loginToken)
    userService.getByUsername(user.username)
        .then(user => postService.getUserFollowingsPosts(user.following))
        .then(posts => res.send(posts))
        .catch(err => console.log(err))


})
app.get('/api/post/:username', (req, res) => {
    const { username } = req.params
    postService.getUserPosts(username)
        .then(posts => res.send(posts))
})
app.put('/api/post/addlike', (req, res) => {
    const post = req.body
    const { loginToken } = req.cookies
    const loggedinUser = userService.validateToken(loginToken)
    postService.addLike(post._id, loggedinUser)
        .then(res.send('success'))
        .catch(err => console.log(err))
})

app.put('/api/post/addComment', (req, res) => {
    const { postId, comment } = req.body
    const { loginToken } = req.cookies
    const loggedinUser = userService.validateToken(loginToken)
    postService.addComment(postId, comment, loggedinUser)
        .then((commentSaved)=>res.send(commentSaved))
        .catch(err => console.log(err))

})
app.delete('/api/post/removelike', (req, res) => {
    const post = req.body
    const { loginToken } = req.cookies
    const loggedinUser = userService.validateToken(loginToken)
    postService.removeLike(post._id, loggedinUser)
        .then(res.send('success'))
        .catch(err => console.log(err))
})
app.get('/api/post/id/:postId',(req,res)=>{
    const { postId } = req.params
    postService.getById(postId)
    .then(post=>res.send(post))
    .catch(err=>console.log(err))
})






const port = 3030
app.listen(port, () =>
    loggerService.info(`Server listening on port http://127.0.0.1:${port}/`)
)
