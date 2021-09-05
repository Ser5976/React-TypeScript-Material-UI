import User from './User.js';
import bcrypt from 'bcryptjs'; //для хеширование пароля
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken'; //для  генерации токина
import { SecretKey } from './config.js';

// генерация токена
const generateAccessToken = (id, username) => {
  const payload = {
    id,
    username,
  };
  return jwt.sign(payload, SecretKey.secret, { expiresIn: '24h' });
};
// валидация токена
const validationAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, SecretKey.secret);
    return userData;
  } catch (e) {
    return null;
  }
};

class AuthController {
  async registration(req, res) {
    try {
      // валидация реквеста
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ massage: errors });
      }
      const { username, password } = req.body;
      // проверка на наличие username
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'Пользователь с таким именем уже существует' });
      }
      // кэширование пароля
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = await User.create({ username, password: hashPassword });
      //генерация JWT токина
      const token = generateAccessToken(user._id, user.username);
      res.json({ user, token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка регистрации' });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      // проверка на наличие username
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${username} не найден` });
      }
      // проверка пароля
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Пароль неверный` });
      }
      // console.log(user);
      //генерация JWT токина
      const token = generateAccessToken(user._id, user.username);
      return res.json({ token, username });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка авторизации' });
    }
  }

  async getUsers(req, res) {
    try {
      // проверка наличия токена в заголовке
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        return res
          .status(400)
          .json({ message: `Пользователь  не авторизован` });
      }
      // console.log(authorizationHeader);
      // получение  токена из заголовка для проверки валидности
      const accessToken = authorizationHeader.split(' ')[1];
      if (!accessToken) {
        return res
          .status(400)
          .json({ message: `Пользователь  не авторизован` });
      }
      //console.log(accessToken);
      //проверка токена на валидность
      const userData = validationAccessToken(accessToken);
      // console.log(userData);
      if (!userData) {
        return res.status(400).json({ message: 'Токен не валиден' });
      }
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AuthController();
