# Blog CRUD app

## Tech stack

- Frontend: React, TypeScript, TailwindCSS, Shadcn-UI
- Backend: Express, TypeScript, Sequelize ORM
- Database: MySQL
- Others: Docker, Jest

## API Endpoints

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `/api/blogs`                             | Retrieve all blogs.                      |
| `GET`    | `/api/blogs/1`                           | Retrieve blog #1.                        |
| `POST`   | `/api/blogs`                             | Create a new blog.                       |
| `PUT`    | `/api/blogs/1`                           | Update data in blog #1.                  |
| `DELETE` | `/api/blogs/1`                           | Delete blog #1.                          |

## Installation and Setup

### 1. Clone this repository

```
git clone https://github.com/M1ke002/crud-app.git
```

### 2. Running the Frontend

Navigate to the `frontend` directory and install the dependencies
```
cd frontend
npm install
```
To start the development server (on http://localhost:5173)
```
npm run dev
```
### 3. Running the Backend
Navigate to the root folder and ensure Docker is running on your machine. To start the backend server and MySQL containers, run:
```bash
docker-compose up
# use -d flag to run in background
```
This will start the backend API on http://localhost:3000 and the database on port 3307

To stop the containers:
```bash
docker-compose down
```

**NOTE**: On the first time running the containers, there might be an ```ECONNREFUSED``` error when the backend tries to connect to the MySQL database. This is because the MySQL server may not have fully initialized by the time the backend attempts to connect. If you see this error, restart the backend container and everything should work as expected:
```bash
#restart the api service
docker-compose restart api
```
### 4. Running Tests
To run the backend unit tests:
```
cd backend
npm run test
```

