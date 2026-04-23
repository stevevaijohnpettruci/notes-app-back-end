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
import authenticateToken from '../../../middleware/auth.js';

const router = express.Router();

router.post(
  '/notes',
  authenticateToken,
  validate(notePayloadSchema),
  createNote,
);
router.get('/notes', authenticateToken, getAllNotes);
router.get('/notes/:id', authenticateToken, getNotesById);
router.put(
  '/notes/:id',
  authenticateToken,
  validate(notePayloadSchema),
  editNoteById,
);
router.delete('/notes/:id', authenticateToken, deleteNoteById);

export default router;
