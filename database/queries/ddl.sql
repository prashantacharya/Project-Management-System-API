CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(256) NOT NULL,
  role_id INT NOT NULL DEFAULT 1,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(256) NOT NULL,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE TABLE IF NOT EXISTS projects (
  project_id SERIAL PRIMARY KEY,
  name VARCHAR(256) UNIQUE NOT NULL,
  description TEXT,
  project_manager INT,
  CONSTRAINT fk_user FOREIGN KEY (project_manager) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS project_user (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  project_id INT NOT NULL,
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_project_id FOREIGN KEY (project_id) REFERENCES projects(project_id)
);

CREATE TABLE IF NOT EXISTS tasks (
  task_id SERIAL PRIMARY KEY,
  title VARCHAR(256) NOT NULL,
  description TEXT,
  deadline DATE NOT NULL,
  project_id INT NOT NULL,
  assignee INT,
  assigned_to INT,
  previously_assigned_to INT,
  CONSTRAINT fk_project_id FOREIGN KEY (project_id) REFERENCES projects(project_id),
  CONSTRAINT fk_assignee FOREIGN KEY (assignee) REFERENCES users(id),
  CONSTRAINT fk_assigned_to FOREIGN KEY (assigned_to) REFERENCES users(id),
  CONSTRAINT fk_previously_assigned_to FOREIGN KEY (previously_assigned_to) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS task_user (
  id SERIAL PRIMARY KEY,
  task_id INT NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT fk_task_id FOREIGN KEY (task_id) REFERENCES tasks(id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS comments (
  comment_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  task_id INT NOT NULL,
  text TEXT NOT NULL,
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_task_id FOREIGN KEY (task_id) REFERENCES tasks(task_id)
);