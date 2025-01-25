import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Actions from "./Actions";
import MeetingCard from "./MeetingCard";

const UpcomingMeetings = () => {
  return (
    <Box sx={{ p: 4 }}>
      {/* Botones de acción */}
      <Actions />

      {/* Mensaje de tiempo */}
      <Typography variant="h6" mt={3} mb={2}>
        2 hours left for the next meeting
      </Typography>

      {/* Tarjetas de reuniones */}
      <Grid container spacing={3}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <MeetingCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UpcomingMeetings;
