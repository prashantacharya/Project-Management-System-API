# Project management system API Setup

To get the project running on your system, do the following.

### Setting up the database

1. Clone the repo
2. Open postgres via a CLI.
3. Create a database with
   ```sql
     CREATE DATABASE project_management;
   ```
4. Select the database

```psql
\c project_management
```

6. Execute the `roles.sql` and `ddl.sql` in the Postgres CLI.

```psql
  \i roles.sql
  \i ddl.sql
```

### Setting up the backend

1. install the dependencies

```shell
npm i
yarn
```

2. Copy the contents of `.env.example` file on `.env` and make necessary changes.

3. Run the development server

```sh
npm start
yarn start
```
