import React from "react";
import { Button, Box, Grid } from "@mui/material";
import { VideoCall, AddCircleOutline, CalendarToday } from "@mui/icons-material";

const actions = [
  { text: "New Meeting", subtext: "Start New Meeting", icon: <VideoCall sx={{fontSize: 40, marginRight: 3}} />, bg: "linear-gradient(90deg, #7F00FF, #E100FF)" },
  { text: "Join Meeting", subtext: "Via Invitation Link", icon: <AddCircleOutline sx={{fontSize: 30, marginRight: 3}}/>, bg: "#181818" },
  { text: "Schedule Meeting", subtext: "Plan Your Meeting", icon: <CalendarToday sx={{fontSize: 40, marginRight: 3  }}/>, bg: "#181818" },
];

const Actions = () => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {actions.map((action, index) => (
        <Grid item key={index}>
          <Button
            sx={{
              minWidth: 300,
              height: 90,
              background: action.bg,
              color: "white",
              textTransform: "none",
              display: "flex",
              alignItems: "center", 
              borderRadius: 3,
              px: 2, // Padding horizontal
              "&:hover": { opacity: 0.8 },
            }}
          >
            {/* Ícono alineado a la izquierda */}
            <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>{action.icon}</Box>
            
            {/* Texto alineado a la derecha del icono */}
            <Box sx={{ textAlign: "left" }}>
              <Box sx={{ fontWeight: "bold", fontSize: "1rem" }}>{action.text}</Box>
              <Box sx={{ fontSize: "0.8rem", opacity: 0.7 }}>{action.subtext}</Box>
            </Box>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default Actions;
