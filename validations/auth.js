import { body } from 'express-validator'

export const registerValidation = [
    body('email', 'Невірний формат').isEmail(),
    body('password','Пароль мін 5 символів').isLength({ min: 5 }),
    body('fullName','Вкажіть імя').isLength({ min: 3 }),
    body('avatarUrl','Хибне посилання').optional().isURL(),
];