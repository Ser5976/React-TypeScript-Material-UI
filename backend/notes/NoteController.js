import Note from './Note.js';
import FileServise from '../FileServise.js';

class NoteController {
  async create(req, res) {
    try {
      //  console.log(req.files.picture);
      if (req.files) {
        const fileName = FileServise.saveFile(req.files.picture);
        const note = await Note.create({ ...req.body, picture: fileName });
        res.json(note);
      } else {
        const note = await Note.create(req.body);
        res.json(note);
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getAll(req, res) {
    try {
      const notes = await Note.find();
      return res.json(notes);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ massage: 'Id не указан' });
      }
      const note = await Note.findById(id);
      return res.json(note);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const note = req.body;
      // console.log(note);
      // console.log(req.files);
      if (!id) {
        res.status(400).json({ massage: 'Id не указан' });
      }
      if (req.files) {
        const fileName = FileServise.saveFile(req.files.picture);
        const updateNote = await Note.findByIdAndUpdate(
          id,
          { ...note, picture: fileName },
          {
            new: true,
          }
        );
        return res.json(updateNote);
      } else {
        const updateNote = await Note.findByIdAndUpdate(id, note, {
          new: true,
        });
        return res.json(updateNote);
      }
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
      const deleteNote = await Note.findByIdAndDelete(id);
      return res.json(deleteNote);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new NoteController();
