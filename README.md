# Pathlock


---

## 🧠 Assignment Overview

### 🧮 Home Assignment 1 – Basic Task Manager (10 Credits)

A simple **task management** application demonstrating CRUD functionality and full-stack integration.

#### 🔧 Functionalities
- Display a list of tasks  
- Add a new task (with description)  
- Mark tasks as completed/uncompleted  
- Delete tasks  

#### ⚙️ Backend (C# .NET 8)
- RESTful API built using **.NET 8 Core**  
- **In-memory data storage** (no database)  
- Model: `{ id, title, description, isCompleted }`  
- Endpoints:  
  - `GET /api/tasks` – Fetch all tasks  
  - `POST /api/tasks` – Add a new task  
  - `PUT /api/tasks/{id}` – Update completion status  
  - `DELETE /api/tasks/{id}` – Remove a task  

#### 💻 Frontend (React + TypeScript)
- Built using **React Hooks** for state management  
- Integrated with backend using **Axios / Fetch API**  
- Features:
  - Add, view, toggle, and delete tasks  
  - Filter tasks (All / Completed / Active)  
  - Basic styling with **Bootstrap / Tailwind CSS**  
  - Optional: Save tasks in **localStorage**  

---

### 🧭 Home Assignment 2 – Mini Project Manager (20 Credits)

An advanced **Project Management System** with authentication and modular architecture.

#### 🧩 Core Features
- User registration & login using **JWT Authentication**  
- Each user can manage multiple projects  
- Projects contain multiple tasks  

#### ⚙️ Backend (C# .NET 8 + Entity Framework Core)
- REST API architecture with **DTOs, Models, and Services**  
- **SQLite / In-memory database**  
- **Authentication Endpoints:**  
  - `POST /api/auth/register`  
  - `POST /api/auth/login`  
- **Project Endpoints:**  
  - `GET /api/projects` – List user projects  
  - `POST /api/projects` – Create project  
  - `DELETE /api/projects/{id}` – Delete project  
- **Task Endpoints:**  
  - CRUD operations within projects  
- **Validation:** DataAnnotations for clean inputs  

#### 💻 Frontend (React + TypeScript)
- **Pages:** Login/Register, Dashboard, Project Details  
- **Features:**
  - Create/Delete projects  
  - Add, edit, and toggle tasks  
  - React Router for navigation  
  - Form validation & error handling  
  - Store JWT in localStorage for secure API calls  
  - Mobile-friendly UI  

---

### ⚡ Bonus – Smart Scheduler API (10 Credits)

A feature that automatically plans user tasks.  

#### Example Endpoint:
