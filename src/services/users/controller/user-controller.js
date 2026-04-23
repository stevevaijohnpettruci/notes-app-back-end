import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import UserRepositories from '../repositories/user-repositories.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const createUser = async (req, res, next) => {
  const { username, password, fullname } = req.validated;

  const isUsernameExist = await UserRepositories.verifyNewUsername(username);
  if (isUsernameExist) {
    return next(
      new InvariantError('Gagal menambahkan user. Username sudah digunakan.'),
    );
  }
  const user = await UserRepositories.createUser({
    username,
    password,
    fullname,
  });

  if (!user) {
    return next(new InvariantError('User gagal ditambahkan'));
  }

  return response(res, 201, 'User berhasil ditambahkan', { id: user.id });
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await UserRepositories.getUserById(id);

  if (!user) {
    return next(new NotFoundError('User tidak ditemukan'));
  }

  const mapUser = (user) => ({
    username: user.username,
    fullname: user.fullname,
  });
  return response(res, 200, 'User berhasil ditampilkan', {
    id: user.id,
    username: user.username,
    fullname: user.fullname,
    created_at: user.created_at,
    updated_at: user.updated_at,
    user: mapUser(user),
  });
};
