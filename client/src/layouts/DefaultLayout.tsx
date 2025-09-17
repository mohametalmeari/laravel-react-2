import { Navigate, Outlet } from "react-router";
import { useStateContext } from "../contexts/store";
import { Navbar } from "@/components/Navbar";

export const DefaultLayout = () => {
  const { token } = useStateContext();

  if (!token) {
    return <Navigate to={"/signin"} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};
