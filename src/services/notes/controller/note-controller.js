import NoteRepositories from '../repositories/note-repositories.js';
import { InvariantError, NotFoundError } from '../../../exceptions/index.js';
import response from '../../../utils/response.js';

export const createNote = async (req, res, next) => {
  const { title, tags, body } = req.validated;

  const note = await NoteRepositories.createNote({ title, tags, body });

  if (!note) {
    return next(new InvariantError('Gagal menambahkan catatan'));
  }

  return response(res, 201, 'Catatan berhasil ditambahkan', {
    noteId: note.id,
  });
};

export const getAllNotes = async (req, res) => {
  const notes = await NoteRepositories.getAllNotes();

  return response(res, 200, 'Catatan sukses ditampilkan', { notes });
};

export const getNotesById = async (req, res, next) => {
  const { id } = req.params;
  const note = await NoteRepositories.getNoteById(id);

  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil ditampilkan', { note: note });
};

export const editNoteById = async (req, res, next) => {
  const { id } = req.params;
  const { title, tags, body } = req.validated;

  const note = await NoteRepositories.editNoteById({ id, title, tags, body });

  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil diperbarui', { noteId: note.id });
};

export const deleteNoteById = async (req, res, next) => {
  const { id } = req.params;
  const deletedNote = await NoteRepositories.deleteNoteById(id);

  if (!deletedNote) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil dihapus');
};
