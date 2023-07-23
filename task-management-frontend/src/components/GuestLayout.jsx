import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() 
{
  const {token} = useStateContext();

  if (token) {
    return <Navigate to='/tasks' />;
  }

    return (
        <>
          <div className="container-fluid">
            <div className="container mt-5 pt-5">
              <div className="row">
                <div className="col-12 col-md-8 col-sm-8 m-auto">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </>
      )
}