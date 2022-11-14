import express from 'express';
import { nextTick } from 'process';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator'
import { registerValidation } from './validations/auth.js'

mongoose.connect('mongodb+srv://user:88888888@cluster0.6dzjpsq.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err))

const app = express()
app.use(express.json())

app.post('/auth/register', registerValidation, (req, res) => {
    const error = validationResult(req);
    console.log(error)

    if (!error.isEmpty()) {
        return res.status(400).json(error.array());
    }
    res.json({
        success: true,
    });
})



app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server OK')
})
