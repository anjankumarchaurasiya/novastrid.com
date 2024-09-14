# Task Manager Application

This is a Task Manager application built with React, TypeScript, Redux, and Vite. It provides a user interface for managing tasks with features such as adding, completing, deleting, and filtering tasks. The application uses `localStorage` for persisting tasks across browser sessions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [API Integration](#api-integration)
 
## Installation

To get started with this project, follow these steps:

1. **Clone the Repository**

  ```bash
  git clone <repository-url>
  cd <repository-directory>

2. **Install Dependencies**
  npm install
  npm run dev
  
3. **Usage**  
  Once the development server is running, you can access the application at http://localhost:3000.

4. **Features**
  1- Add Tasks: Enter a task title and click "Add Task" to create a new task.
  2- Mark as Completed: Check the checkbox next to a task to mark it as completed.
  3- Mark as Pending: Uncheck the checkbox to mark a task as pending.
  4- Delete Tasks: Click "Delete" to remove a task.
  5- Filter Tasks: Use the filter buttons to view tasks based on their status (All, Completed, Pending).

5. **Folder Structure**
  │src/
  │
  ├── components/
  │   ├── Footer.tsx         # Footer component
  │   ├── Header.tsx         # Header component
  │   ├── TaskInput.tsx      # Input form for adding tasks
  │   └── TaskFilter.tsx     # Filter Action
  │   └── TaskList.tsx       # List of tasks with action
  │
  ├── redux/
  │   ├── store.ts           # Redux store configuration
  │   └── tasksSlice.ts      # Redux slice for task management
  │
  ├── App.tsx                # Main application component
  ├── Main.tsx               # Entry point for the React application
  ├── vite.config.ts         # Vite configuration file
  └── global.d.ts            # TypeScript declarations for global types

6. **API Integration**
  For this project, tasks are initially fetched from a local JSON file. During the first load, the application reads tasks from this file. After this initial fetch, tasks are stored in localStorage and subsequently retrieved from localStorage for future operations.

  Initial Data Fetch:

  The TaskList.tsx component fetches tasks from a local JSON file (/tasks.json) the first time the application is loaded.
  The tasksSlice.ts is set up to handle this initial fetch and store the data in localStorage.
  Subsequent Data Management:

  After the initial fetch, tasks are managed using localStorage.
  Updates to tasks, including adding, toggling, and deleting tasks, are synchronized with localStorage to persist changes across page reloads.
  Implementation Details:

  In tasksSlice.ts, the setTasks reducer initializes localStorage if it’s empty, ensuring that data is not overwritten on subsequent loads.
  The localStorage utility functions are used to handle reading from and writing to localStorage to maintain task data.