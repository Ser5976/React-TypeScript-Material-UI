import TodoList from './TodoList.js';

class TodoListController {
  async create(req, res) {
    try {
      const todolist = await TodoList.create(req.body);
      res.json(todolist);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getAll(req, res) {
    try {
      const todolist = await TodoList.find();
      return res.json(todolist);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const todolist = req.body;
      if (!id) {
        res.status(400).json({ massage: 'Id не указан' });
      }

      const updateTodoList = await TodoList.findByIdAndUpdate(id, todolist, {
        new: true,
      });
      return res.json(updateTodoList);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ massage: 'Id не указан' });
      }
      const deleteTodoList = await TodoList.findByIdAndDelete(id);
      return res.json(deleteTodoList);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new TodoListController();
