import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      {/* title */}
      <p className="flex justify-center p-3 font-bold text-3xl bg-white">
        Blog CRUD App
      </p>

      <hr className="mb-6" />

      <div className="max-w-[1400px] mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
