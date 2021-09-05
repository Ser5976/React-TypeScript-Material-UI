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
        const filePath = await Note.find({ _id: id });

        const fileName = FileServise.saveFile(req.files.picture);
        const updateNote = await Note.findByIdAndUpdate(
          id,
          { ...note, picture: fileName },
          {
            new: true,
          }
        );

        res.json(updateNote);
        if (filePath[0].picture) {
          FileServise.deleteFile(filePath[0].picture);
        }
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
      //удаление файла с жесткого диска(папка static)
      const filePath = await Note.find({ _id: id });
      console.log(filePath[0].picture);
      if (filePath[0].picture) {
        FileServise.deleteFile(filePath[0].picture);
      }
      //удаление записки с базы
      const deleteNote = await Note.findByIdAndDelete(id);
      return res.json(deleteNote);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new NoteController();
