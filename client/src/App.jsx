import React from "react";
import { Route, Routes } from "react-router-dom";
import { Sidebar, Navbar } from "./components";
import {
  CampaignDetails,
  CreateCampaign,
  Home,
  Profile,
  UpdateCampaign,
  Withdraw,
} from "./pages";

const App = () => {
  return (
    <div className="relative sm:p-8  p-4  bg-[#13131a] min-h-screen flex flex-row ">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/update-campaign/:id" element={<UpdateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/withdraw" element={<Withdraw />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
