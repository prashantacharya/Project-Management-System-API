import createError from '../utils/createError';
import Project from '../models/projects.model';
import { knexConnection } from '../database/bookshelf';
import deletePasswordFromResponse from '../utils/deletePassword';

export const createProject = async (req, res, next) => {
  if (req.authenticatedUserRoleId != 4) {
    next(createError('401', 'Unauthorized'));
  }

  if (!req.body.name || !req.body.projectManager) {
    next(
      createError(400, 'Project name and project manager are compulsory fields')
    );
  }

  try {
    const project = await Project.forge().save({
      name: req.body.name,
      description: req.body.description,
      project_manager: req.body.projectManager,
    });

    const {
      project_id: projectId,
      name,
      description,
      project_manager: projectManager,
    } = project.toJSON();

    res.status(201).json({
      status: 'Success',
      payload: {
        projectId,
        name,
        description,
        projectManager,
      },
    });
  } catch (error) {
    if (error.constraint === 'projects_name_key') {
      next(createError(400, 'Project already exists.'));
    } else {
      next(error);
    }
  }
};

export const getAssginedProjects = async (req, res, next) => {
  try {
    let projects;
    switch (req.authenticatedUserRoleId) {
      case 1:
      case 2:
        projects = await knexConnection()
          .from('project_user')
          .where('user_id', req.authenticatedUserID)
          .innerJoin(
            'projects',
            'project_user.project_id',
            'projects.project_id'
          );
        break;

      case 3:
      case 4:
        const data = await new Project().fetchAll();
        projects = data.toJSON();
        break;
    }

    res.send({
      status: 'success',
      payload: projects,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  if (req.authenticatedUserRoleId !== 4) {
    next(createError(401, 'Unauthorized to delete project'));
    return;
  }

  try {
    const deletedProject = await knexConnection('projects')
      .where('project_id', req.params.id)
      .del();

    const deleteProjectFromPivotTable = await knexConnection('project_user')
      .where('project_id', req.params.id)
      .del();

    if (!deletedProject) {
      throw createError(404, 'Project with specified ID not found');
    }

    res.status(200).json({
      status: 'Success',
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const addUserToProject = async (req, res, next) => {
  if (req.authenticatedUserRoleId != 4) {
    next(createError(401, 'Only admin can add user to the project'));
    return;
  }

  try {
    const data = await knexConnection('project_user').insert({
      user_id: req.params.userId,
      project_id: req.params.id,
    });

    res.status(201).json({
      status: 'Success',
      payload: {
        userId: req.params.userId,
        projectId: req.params.id,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUsersInProject = async (req, res, next) => {
  try {
    const users = await knexConnection()
      .from('project_user')
      .where('project_id', req.params.id)
      .innerJoin('users', 'project_user.user_id', 'users.id');

    res.json({
      status: 'Success',
      payload: deletePasswordFromResponse(users),
    });
  } catch (error) {
    next(error);
  }
};
