import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function DefaultLayout() 
{
  const {token, userName, userId, setToken, setUserName, setUserId} = useStateContext();

  if (!token) {
    return <Navigate to='/login' />;
  }

  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.post('auth/logout')
      .then(() => {
        setUserName(null);
        setUserId(null);
        setToken(null);
      }) 
      .catch((err) => {
        console.log(err);
      })
  };

  return (
    <>
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand text-dark" href="/tasks">Task Management</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Hello {userName}!
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={onLogout}>Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Outlet />
      </div>
    </>
    )
}