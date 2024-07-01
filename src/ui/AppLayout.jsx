import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AppLayout = () => {

  return (
    <div className="overflow-hidden">
      <Header />
      <div className="flex w-screen h-screen bg-slate-200 pt-12">
        <Sidebar />
        <div className="flex-1 flex flex-col dark:bg-slate-600">
          <main className="flex-1 overflow-x-scroll">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
