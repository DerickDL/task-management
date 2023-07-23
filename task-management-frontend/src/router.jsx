import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Tasks from "./views/Tasks";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import TaskForm from "./views/TaskForm";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/tasks',
                element: <Tasks />,
            },
            {
                path: '/',
                element: <Navigate to='/tasks' />,
            },
            {
                path: '/task/new',
                element: <TaskForm key='taskCreate'/>,
            },
            {
                path: '/task/:id',
                element: <TaskForm key='taskUpdate'/>,
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
        ]
    },  
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default router;