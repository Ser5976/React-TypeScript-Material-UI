import Router from 'express';
import TodoListController from './TodoListController.js';

const routerTodolist = new Router();

routerTodolist.post('/todoList', TodoListController.create);
routerTodolist.get('/todolist', TodoListController.getAll);
routerTodolist.put('/todoList/:id', TodoListController.update);
routerTodolist.delete('/todoList/:id', TodoListController.delete);

export default routerTodolist;
