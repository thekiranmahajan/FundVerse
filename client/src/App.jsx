import React from "react";
import { Route, Routes } from "react-router-dom";
import { Sidebar, Navbar, Footer } from "./components";
import {
  CampaignDetails,
  CreateCampaign,
  Disconnect,
  Home,
  Profile,
  UpdateCampaign,
  Withdraw,
} from "./pages";

const App = () => {
  return (
    <div className="relative sm:p-8  p-4 bg-[#eaeaea] dark:bg-[#13131a] min-h-screen flex  ">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex justify-between flex-col w-full gap-10">
        <div className="flex-1 max-sm:w-full  sm:pr-5">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/update-campaign/:id" element={<UpdateCampaign />} />
            <Route path="/campaign-details/:id" element={<CampaignDetails />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/disconnect" element={<Disconnect />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
