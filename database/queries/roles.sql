CREATE TABLE IF NOT EXISTS roles (
  role_id int PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);

INSERT INTO roles 
  (role_id, name) 
  VALUES 
  (1, 'Engineer'),
  (2, 'Team Lead'),
  (3, 'Project Manager'),
  (4, 'Admin');

