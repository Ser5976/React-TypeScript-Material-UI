import mongoose from 'mongoose';

const Note = new mongoose.Schema({
  title: { type: String, required: true },
  detalis: { type: String, required: true },
  category: { type: String, required: true },
  picture: { type: String },
});

export default mongoose.model('Note', Note);
