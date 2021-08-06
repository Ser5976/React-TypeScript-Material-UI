import mongoose from 'mongoose';

const TodoList = new mongoose.Schema({
  title: { type: String, required: true },
  made: { type: Boolean, required: true },
});

export default mongoose.model('TodoList', TodoList);
