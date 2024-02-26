import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, Navbar, Footer } from "./components";

const App = () => {
  return (
    <div className="relative sm:p-8  p-4 bg-[#eaeaea] dark:bg-[#13131a] min-h-screen flex  ">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex justify-between flex-col w-full gap-10">
        <div className="flex-1 max-sm:w-full  sm:pr-5">
          <Navbar />

          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
