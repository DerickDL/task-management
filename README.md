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
- MariaDB

## Prerequisite
- XAMPP
- composer
- npm

## How to setup locally
### Backend
- Go to task-management-backend folder and execute the following
  - `composer install`
  - `php artisan migrate`
  - `php artisan serve`

### Frontend
- TBA


## Feature Test
- Feature test is provided to the API side
- Go to task-management-backend folder and execute `php artisan test --filter TaskCrudTest`
