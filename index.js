import express from 'express';
import { nextTick } from 'process';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import   mongoose  from 'mongoose';
import { validationResult } from 'express-validator';
import { registerValidation } from './validations/auth.js';
import UserModel from './models/User.js';

//-------------------------------
mongoose.connect('mongodb+srv://user:88888888@cluster0.6dzjpsq.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err))
//------------------------------- 

const app = express()
app.use(express.json())
app.post('/auth/login', async (req, res)=>{
    try {
        const user = await UserModel.findOne({email: req.body.email})
        if(!user){
            return res.status(404).json({
                message: "Користувач відсутній"
            });
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if(!isValidPass){
            return res.status(403).json({
                message: "Не вірнй логін чи пароль"
            });
        }

        const token = jwt.sign({
            _id: user._id,
        },
         'secret123',
         {
            expiresIn: '30d'
         },
        );

        const {passwordHash, ...userData} = user._doc;
         
        res.json({
            ...userData,
             token,
        });

    } catch (err) {
        res.status(500).json({
            message: 'не вдалося авторизуватись',
        })
    }
})
//------------------------------------
app.post('/auth/register', registerValidation, async (req, res) => {
    try {
        const error = validationResult(req);
        console.log(error)
        //------перевіряємо чи є якісь помилки--------
        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }
        //-----------шифруємо хеш----------------------------
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        //-------------створюємо документ--------------------
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        })
        const user = await doc.save();
        //--------------------------------------------------
        const token = jwt.sign({
            _id: user._id,
        },
         'secret123',
         {
            expiresIn: '30d'
         },
        );

        const {passwordHash, ...userData} = user._doc;
         
        res.json({
            ...userData,
             token,
        });

    } catch (err) {
        res.status(500).json({
            message: 'не вдалось зареєструатися',
        })
    }
})
//------------------------------------



app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server OK')
})
