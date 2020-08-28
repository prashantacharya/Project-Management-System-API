import Task from '../models/tasks.model';

import createError from '../utils/createError';
import { knexConnection } from '../database/bookshelf';

export const createTask = async (req, res, next) => {
  if (req.authenticatedUserRoleId == 1) {
    next(createError(401, 'Unauthorized'));
  }

  const { title, description, deadline, assignedTo } = req.body;

  try {
    const data = await Task.forge().save({
      title,
      description,
      deadline,
      assigned_to: assignedTo,
      assignee: req.authenticatedUserID,
      project_id: req.params.projectId,
    });

    const { task_id, assigned_to, assignee, project_id } = data.toJSON();

    res.status(201).send({
      status: 'Success',
      payload: {
        id: task_id,
        title,
        description,
        assignedTo: assigned_to,
        assignee,
        deadline,
        projectId: project_id,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  if (req.authenticatedUserRoleId === 1) {
    next(createError(401, 'Not authorized to perform the operation'));
    return;
  }

  try {
    const deletedTask = await knexConnection('tasks')
      .where({ task_id: req.params.id })
      .del();

    if (!deletedTask) throw createError(404, 'Task not found');

    res.json({
      status: 'Success',
      payload: {
        taskId: req.params.id,
        message: 'Deleted successfully',
      },
    });
  } catch (error) {
    next(error);
  }
};

export const tagTask = async (req, res, next) => {
  if (req.authenticatedUserRoleId === 1) {
    next(createError(401, 'Unauthorized'));
  }

  try {
    const { id: taskId, userId } = req.params;
    const data = await knexConnection('task_user').insert({
      task_id: taskId,
      user_id: userId,
    });

    res.status(201).json({
      status: 'Success',
      payload: {
        taskId,
        userId,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTaskInProject = async (req, res, next) => {
  try {
    const tasks = await knexConnection('tasks')
      .where('project_id', req.params.id)
      .innerJoin('users', 'tasks.assigned_to', 'users.id');

    res.json({
      status: 'Success',
      payload: tasks,
    });
  } catch (error) {
    next(error);
  }
};
