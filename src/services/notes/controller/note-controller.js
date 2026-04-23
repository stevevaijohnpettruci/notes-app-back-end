import NoteRepositories from '../repositories/note-repositories.js';
import { InvariantError, NotFoundError } from '../../../exceptions/index.js';
import response from '../../../utils/response.js';
import AuthorizationError from '../../../exceptions/authorization-error.js';

export const createNote = async (req, res, next) => {
  const { title, tags, body } = req.validated;
  const { id: owner } = req.user;

  const note = await NoteRepositories.createNote({ title, tags, body, owner });

  if (!note) {
    return next(new InvariantError('Gagal menambahkan catatan'));
  }

  return response(res, 201, 'Catatan berhasil ditambahkan', {
    noteId: note.id,
  });
};

export const getAllNotes = async (req, res, next) => {
  try {
    const { id: owner } = req.user;
    const notes = await NoteRepositories.getNotes(owner);
    const noteMap = notes.map((note) => ({
      noteId:note.id,
      title: note.title,
      createdAt: note.created_at,
      updatedAt: note.updated_at,
      tags: note.tags,
      body: note.body,
    }));
    return response(res, 200, 'Catatan sukses ditampilkan', { notes: noteMap });
  } catch (err) {
    next(err);
  }
};

/*  */

export const getNotesById = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const isOwner = await NoteRepositories.verifyNoteOwner(id, owner);
  if (!isOwner) {
    return next(
      new AuthorizationError('Anda tidak berhak mengakses resource ini'),
    );
  }

  const note = await NoteRepositories.getNoteById(id);

  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil ditampilkan', { note: note });
};

export const editNoteById = async (req, res, next) => {
  const { id } = req.params;
  const { title, body, tags } = req.validated;
  const { id: owner } = req.user;
  const isOwner = await NoteRepositories.verifyNoteOwner(id, owner);
  if (!isOwner) {
    return next(
      new AuthorizationError('Anda tidak berhak mengakses resource ini'),
    );
  }

  const note = await NoteRepositories.editNoteById({ id, title, tags, body });

  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil diperbarui', { noteId: note.id });
};

export const deleteNoteById = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const isOwner = await NoteRepositories.verifyNoteOwner(id, owner);
  if (!isOwner) {
    return next(
      new AuthorizationError('Anda tidak berhak mengakses resource ini'),
    );
  }
  const deletedNote = await NoteRepositories.deleteNoteById(id);

  if (!deletedNote) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil dihapus', null);
};
