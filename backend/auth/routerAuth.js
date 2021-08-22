import Router from 'express';
import AuthController from './AuthController.js';
import { check } from 'express-validator'; // для валидации реквеста

const routerAuth = new Router();

routerAuth.post(
  '/registration',
  [
    check('username', 'Поле не должно быть пустым').notEmpty(),
    check(
      'password',
      'Пороль должен быть больше 3 и меньше 8 символов'
    ).isLength({ min: 4, max: 8 }),
  ],
  AuthController.registration
);
routerAuth.post('/login', AuthController.login);
routerAuth.get('/users', AuthController.getUsers);

export default routerAuth;
