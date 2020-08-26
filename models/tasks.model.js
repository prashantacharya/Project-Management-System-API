import bookshelf from '../database/bookshelf';

const Task = bookshelf.model('Task', {
  tableName: 'tasks',
});

export default Task;
