import bookshelf from '../database/bookshelf';

const User = bookshelf.model('User', {
  tableName: 'users',
});

export default User;
