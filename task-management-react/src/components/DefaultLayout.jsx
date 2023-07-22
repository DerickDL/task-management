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
      <div id="defaultLayout">
        <div className="content">
          <header>
            <div>
              <Link to='/tasks'>Tasks Management</Link>
            </div>
            <div>
              Hello {userName}
              <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
            </div>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
    )
}