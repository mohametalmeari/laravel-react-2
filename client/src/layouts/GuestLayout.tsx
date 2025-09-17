import { Navigate, Outlet } from "react-router";
import { useStateContext } from "../contexts/store";

export const GuestLayout = () => {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Outlet />
    </div>
  );
};
