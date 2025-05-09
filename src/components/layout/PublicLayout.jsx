import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r">
      <Outlet />
    </div>
  );
};

export default PublicLayout;