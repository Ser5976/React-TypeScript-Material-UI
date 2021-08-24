import express from 'express';
import mongoose from 'mongoose';
import routerNote from './notes/routerNote.js';
import routerTodolist from './todoList/routerTodoList.js';
import routerAuth from './auth/routerAuth.js';
import fileUpload from 'express-fileupload';
import cors from 'cors'; //Эта защита от политики CORS

const PORT = process.env.PORT || 5000;

const DB_URL = `mongodb+srv://user:user@cluster0.k9hfy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const app = express();
//const allowedOrigins = ['http://localhost:3000'];

const options = {
  origin: '*', //allowedOrigins      //app.use(cors({origin: '*'}))
};
app.use(cors(options));

/* app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST,PUT,PATCH,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  next();
}); */ // это от этой ошибки - На запрошенном ресурсе отсутствует заголовок Access-Control-Allow-Origin.

app.use(express.json());
app.use(fileUpload({}));
app.use(express.static('static'));
app.use('/api', routerNote);
app.use('/api', routerTodolist);
app.use('/auth', routerAuth);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log(`Сервер запущен на ${PORT}...`));
  } catch (e) {
    console.log(e);
  }
}
startApp();
