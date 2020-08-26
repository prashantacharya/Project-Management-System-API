import bookshelf from '../database/bookshelf';

const Role = bookshelf.model('Role', {
  tableName: 'roles',
});

export default Role;
