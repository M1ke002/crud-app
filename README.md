# Blog crud-app

## Tech stack

- Frontend: React, TypeScript, TailwindCSS, Shadcn-UI
- Backend: Express, TypeScript, Sequelize ORM
- Database: MySQL
- Others: Docker, Jest (for testing)

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
### 3. Running the Backend and database

#### 3.1. Setup Environment Variables

Navigate to the `backend` directory, Create a ```.env``` file to configure your environment variables. You can use the env variables from ```.env.example```

#### 3.2. Running Docker Containers

Navigate to the root folder and ensure Docker is running on your machine. To start the backend server and MySQL containers, run:
```
docker compose up
```
### 4. Running Tests
To run the backend tests using Jest:
```
cd backend
npm run test
```

