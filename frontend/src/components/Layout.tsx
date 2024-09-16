import { Outlet } from "react-router-dom";
import { Toaster } from "./ui/sonner";

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

      <Toaster
        toastOptions={{
          classNames: {
            error: "bg-red-400 text-white",
          },
        }}
        position="top-right"
      />
    </>
  );
};

export default Layout;
