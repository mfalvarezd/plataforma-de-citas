import React from "react";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Stats from "./Components/Stats";
import Actions from "./Components/Actions";
import UpcomingMeetings from "./Components/UpcomingMeetings";
import "./free.css";

const Free = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <Header />
        <Stats />
        <UpcomingMeetings />
      </main>
    </div>
  );
};

export default Free;
