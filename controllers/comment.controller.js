import Comment from '../models/comments.model';
import { knexConnection } from '../database/bookshelf';
import createError from '../utils/createError';

export const createComment = async (req, res, next) => {
  try {
    const comment = await Comment.forge().save({
      user_id: req.authenticatedUserID,
      task_id: req.body.taskId,
      text: req.body.text,
    });

    res.status(201).json({
      status: 'Success',
      payload: comment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const deletedComment = await knexConnection('comments')
      .where({ comment_id: req.params.id, user_id: req.authenticatedUserID })
      .del();

    if (!deletedComment) {
      throw createError(404, 'Comment not found');
    }

    res.json({
      status: 'Success',
      data: {
        id: req.params.id,
        message: 'Deleted comment',
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCommentsInTask = async (req, res, next) => {
  try {
    const comments = await new Comment({
      task_id: req.params.taskId,
    }).fetchAll();

    res.send({
      status: 'Success',
      payload: comments.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};
