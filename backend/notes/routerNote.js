import Router from 'express';
import NoteController from './NoteController.js';

const routerNote = new Router();

routerNote.post('/notes', NoteController.create);
routerNote.get('/notes', NoteController.getAll);
routerNote.get('/notes/:id', NoteController.getOne);
routerNote.put('/notes/:id', NoteController.update);
routerNote.delete('/notes/:id', NoteController.delete);

export default routerNote;
