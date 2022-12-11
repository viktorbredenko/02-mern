import express from 'express';
import { nextTick } from 'process';
import   mongoose  from 'mongoose';
import { registerValidation, loginValidation } from './validations.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'

//------------------------------------------------------
mongoose.connect('mongodb+srv://user:88888888@cluster0.6dzjpsq.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err))
//------------------------------- ------------------
const app = express()
app.use(express.json())

app.post('/auth/login', UserController.login)
app.post('/auth/register', loginValidation, UserController.regiser )
app.get('/auth/me',checkAuth, UserController.getMe )

// app.get('/posts', PostController.getAll)
// app.get('/posts/:id', PostController.getOne)
app.post('/posts', PostController.create)
// app.delete('/posts', PostController.remove)
// app.patch('/posts', PostController.update)




app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server OK')
})
