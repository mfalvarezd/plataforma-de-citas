import React from "react";
import { Card, CardContent, Typography, Box, AvatarGroup, Avatar, Button, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const MeetingCard = () => {
  return (
    <Card sx={{ borderRadius: 3, border: "1px solid rgba(33, 149, 243, 0.53)", p: 2, width: 400 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">Monthly office group meeting</Typography>
          <IconButton size="small">
            <MoreHorizIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary">15:00 - 17:00</Typography>

        {/* Avatares */}
        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <AvatarGroup max={3}>
            <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />
            <Avatar src="https://randomuser.me/api/portraits/women/2.jpg" />
            <Avatar src="https://randomuser.me/api/portraits/men/3.jpg" />
          </AvatarGroup>
          <IconButton>
            <AddCircleOutlineIcon sx={{ color: "#7F00FF" }} />
          </IconButton>
        </Box>

        {/* Botón de unirse */}
        <Button
          sx={{
            background: "#7F00FF",
            color: "white",
            borderRadius: 3,
            textTransform: "none",
            mt: 2,
            "&:hover": { opacity: 0.8 },
          }}
          fullWidth
        >
          Join Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default MeetingCard;
