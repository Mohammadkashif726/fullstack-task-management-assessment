# Task Management System – Full Stack  
**Full Stack Developer Assessment – Mohammad Kashif**

This project is a complete task management system built using **Laravel (backend)** and **React with traditional Redux (frontend)**, following all assessment requirements.

---

## Project Structure

```
task-management/
│
├── backend/     # Laravel backend
├── frontend/     # React frontend
└── README.md
```

---

## Technologies Used

### Backend
- Laravel 10
- Eloquent ORM
- MySQL (or any Laravel-supported DB)
- PHP 8.1+

### Frontend
- React 19
- Traditional Redux (NO Redux Toolkit)
- Redux Thunk
- React Router v6
- Axios
- Bootstrap 5

---

## Domain Model & Relationships
- Client has many Projects
- Project belongs to Client
- Project has many Tasks
- Task belongs to Project
- Task belongs to User (assignee)

---

## Backend Features (Laravel)

### API Endpoints
- GET `/clients` → list clients with nested projects
- GET `/clients/{id}` → single client with nested projects & tasks
- POST `/projects` → create project under specific client
- POST `/tasks` → create task under project & assign to user
- PATCH `/tasks/{id}` → update task status (`todo`, `doing`, `done`)

### Accessors & Mutators
- `is_overdue` → returns true if task due date has passed
- Task `status` → trimmed and converted to lowercase automatically

### Performance
- Eager loading used to avoid N+1 queries  
  `with('projects.tasks.user')`

---

## Frontend Features (React + Redux)

- Client List Page
  - Client name
  - Project count
  - "View Projects" button

- Client Detail Page
  - Projects and tasks grouped by status:
    - To Do
    - Doing
    - Done

- Task Management
  - Task title
  - Assigned user
  - Overdue indicator
  - Status update dropdown (real PATCH request)

- State Management
  - Traditional Redux (actions, reducers, store)
  - Redux Thunk for async logic
  - Business logic outside components

- Custom Hooks
  - `useClients`
  - `useTaskActions`

- Routing
  - Implemented with React Router v6

---

## Setup Instructions (COPY & RUN)

### Prerequisites
- PHP ^8.1
- Composer
- Node.js & npm
- MySQL (or any Laravel-supported DB)

---

## Backend Setup (Laravel)
Clone the Repository:git clone https://github.com/Mohammadkashif726/fullstack-task-management-assessment.git
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Edit `.env` and set database credentials.

```bash
php artisan migrate
php artisan db:seed --class=ProjectManagementSeeder
php artisan serve
```

Backend URL:
http://127.0.0.1:8000

---

## Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

Frontend URL:
http://localhost:3000

---

## Notes
- Frontend communicates with backend using Axios
- Redux Toolkit is intentionally NOT used
- Demo data is created using `ProjectManagementSeeder`

---

## Author
**Mohammad Kashif**  
Full Stack Developer Assessment
