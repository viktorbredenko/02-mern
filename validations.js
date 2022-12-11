import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'Невірний формат').isEmail(),
    body('password','Пароль мін 5 символів').isLength({ min: 5 }),
];

export const registerValidation = [
    body('email', 'Невірний формат').isEmail(),
    body('password','Пароль мін 5 символів').isLength({ min: 5 }),
    body('fullName','Вкажіть імя').isLength({ min: 3 }),
    body('avatarUrl','Хибне посилання').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
    body('tags', 'Неверный формат тэгов').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
  ];
