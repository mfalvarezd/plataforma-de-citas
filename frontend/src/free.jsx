import React, { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Stats from "./Components/Stats";
import Actions from "./Components/Actions";
import ContactList from "./Components/ContactList";
import Calendar from "./Components/Calendar";
import MeetingTable from "./Components/MeetingTable";
import UpcomingMeetings from "./Components/UpcomingMeetings";
import "./free.css";

const Free = () => {
  const [selected, setSelected] = useState("home");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Recuperar el usuario desde localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="dashboard">
      <Sidebar selected={selected} setSelected={setSelected} />
      <main className="main-content">
        {selected === "calendar" && <Calendar user={user}/>}
        {selected === "group" && <ContactList user={user}/>}
        {selected === "video" && <MeetingTable user={user} />}
        {selected !== "calendar" && selected !== "group" && selected !== "video" && (
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
