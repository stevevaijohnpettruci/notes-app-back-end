import express from 'express';
import {
  createNote,
  getAllNotes,
  getNotesById,
  editNoteById,
  deleteNoteById,
} from '../controller/note-controller.js';
import { validate } from '../../../middleware/validate.js';
import { notePayloadSchema } from '../validator/schema.js';

const router = express.Router();

router.post('/notes', validate(notePayloadSchema), createNote);
router.get('/notes',  getAllNotes);
router.get('/notes/:id', getNotesById);
router.put('/notes/:id', validate(notePayloadSchema), editNoteById);
router.delete('/notes/:id', deleteNoteById);

export default router;
