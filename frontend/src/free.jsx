import React, {useState} from "react";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Stats from "./Components/Stats";
import Actions from "./Components/Actions";
import Calendar from "./Components/Calendar";
import UpcomingMeetings from "./Components/UpcomingMeetings";
import "./free.css";

const Free = () => {
  const [selected, setSelected] = useState("home");

  return (
    <div className="dashboard">
      <Sidebar selected={selected} setSelected={setSelected} />
      <main className="main-content">
        <Header />
        {selected === "calendar" ? <Calendar /> : (
          <>
            <Stats />
            <UpcomingMeetings />
          </>
        )}
      </main>
    </div>
  );
};

export default Free;
