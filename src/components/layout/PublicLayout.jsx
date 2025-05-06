import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-stone-950 to-blue-300 p-32">
      <Outlet />
    </div>
  );
};

export default PublicLayout;