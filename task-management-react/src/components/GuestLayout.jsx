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
          <div>
            <Outlet />
          </div>
        </>
      )
}