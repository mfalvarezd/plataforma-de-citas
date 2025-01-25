import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";

const statsData = [
  { title: "Number of meetings", value: 26, bgColor: "#FF7043" },  // Naranja
  { title: "Rescheduled meetings", value: 24, bgColor: "#7E57C2" }, // Morado
  { title: "Cancel meetings", value: 5, bgColor: "#E53935" }, // Rojo
];

const Stats = () => {
  return (
    <Card sx={{ borderRadius: 3, border: "2px solid rgba(33, 149, 243, 0.44)", p: 2, boxShadow: 1 , marginBottom: 2 }}>
      <CardContent>
        <Grid container spacing={3} justifyContent="center">
          {statsData.map((stat, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box display="flex" alignItems="center" gap={2}>
                {/* Círculo con color único */}
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    background: `linear-gradient(135deg, ${stat.bgColor}, ${stat.bgColor}80)`, 
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  <AddCircleOutline />
                </Box>
                {/* Texto */}
                <Box>
                  <Typography variant="body1">{stat.title}</Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This month
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Stats;
