# 1210 Services Inc. Technical Exam
Create a TASK MANAGEMENT SYSTEM

## Goals
The system should be able to do the following:

### Authentication
    - Users should be able to Sign Up using their email.
    - Users should be able to Login.

### Create a Task
    - A task should have the status of Todo, In Progress, Completed.
    - Users should be able to create a new task that will be marked as Todo by default.

### Edit Task
    - Users should be able to update tasks.

### Remove Task
    - Users should be able to move the task to trash if it’s deleted.

### Task List
    - Users should be able to view task lists.
    - Users should be able to sort task lists by date created.
    - Users should be able to search for specific tasks.


## Technologies Used
- Laravel 10
- React
- Bootstrap 5
- Vite
- MariaDB

## Prerequisite
- XAMPP
- composer
- npm

## How to setup locally
### Backend
1. Rename the .env.example file to .env and set up your database connection settings in the .env file:
2. Generate the application key: 
    `php artisan key:generate`
3. Execute `composer install`
4. Run `php artisan migrate`
5. Run `php artisan serve`

### Frontend
1. npm install
2. npm run dev

### Access the app
1. Visit http://localhost:8000 in your browser to access your Laravel app.
2. Visit http://localhost:3000 in your browser to access your React app.


## Feature Test
- Feature test is provided for the API
- Update phpunit.xml to setup the database for testing purposes
- Go to task-management-backend folder and execute `php artisan test --filter TaskCrudTest`
