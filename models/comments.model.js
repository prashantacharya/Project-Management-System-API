import bookshelf from '../database/bookshelf';

const Comment = bookshelf.model('Comment', {
  tableName: 'comments',
});

export default Comment;
