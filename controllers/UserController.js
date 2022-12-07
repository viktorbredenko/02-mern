import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';



export const regiser = async (req, res) => {
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
}

export const login = async (req, res)=>{
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
}

export const getMe = async (req, res)=>{
    try {
        const user = await UserModel.findById(req.userId);

        if(!user){
            return res.status(404).json({
                message: 'Пользователь не найден'
            });
        }

        const {passwordHash, ...userData} = user._doc;
         
        res.json(userData);
        
    } catch (err) {
        console.log(err)
    }
}