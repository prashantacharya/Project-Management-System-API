import bookshelf from '../database/bookshelf';

const Project = bookshelf.model('Project', {
  tableName: 'projects',
});

export default Project;
