import React, { useState } from "react";
import { Box, Avatar, IconButton, Tooltip, Badge } from "@mui/material";
import { Group, Home, VideoCall, Lock, ChatBubble, CalendarToday } from "@mui/icons-material";

const Sidebar = ({ selected, setSelected }) => {
  const menuItems = [
    { id: "group", icon: <Group />, tooltip: "Teams" },
    { id: "home", icon: <Home />, tooltip: "Home" },
    { id: "video", icon: <VideoCall />, tooltip: "Meetings" },
    { id: "calendar", icon: <CalendarToday />, tooltip: "Schedule" },
  ];

  return (
    <Box
      sx={{
        width: 100,
        height: "60vh",
        marginTop: "140px",
        backgroundColor: "#F8F9FA",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        py: 2,
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000, // Asegura que esté por encima de otros elementos
      }}
    >
      {/* Íconos de Menú */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {menuItems.map((item) => (
          <Tooltip key={item.id} title={item.tooltip} placement="right">
            <IconButton
              onClick={() => setSelected(item.id)}
              sx={{
                color: selected === item.id ? "#007BFF" : "#A0A0A0",
                fontSize: 32,
              }}
            >
              {item.notification ? (
                <Badge color="error" variant="dot">
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )}
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      {/* Avatar del Usuario */}
      <Avatar
        alt="User"
        src="https://randomuser.me/api/portraits/men/45.jpg"
        sx={{ width: 40, height: 40, mb: 2 }}
      />
    </Box>
  );
};

export default Sidebar;
