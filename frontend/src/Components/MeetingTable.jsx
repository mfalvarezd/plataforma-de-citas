import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Chip, Typography, Link, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const getStatusClass = (status) => {
  switch (status) {
    case "success":
      return "success";
    case "En proceso":
      return "warning";
    case "Cancelado":
      return "error";
    default:
      return "default";
  }
};

const MeetingTable = ({ user }) => {
  const [meetings, setMeetings] = useState([]); // Estado inicial vacío

  useEffect(() => {
    console.log("useEffect triggered");
    if (user && user.idUser) {
      console.log("User ID:", user.idUser);
      // Llamada a la API para obtener las reuniones del usuario
      axios
        .get(`/api/appointments/filter-by-client?idUser=${user.idUser}`)
        .then((response) => {
          console.log("API response:", response.data);
          setMeetings(response.data);
        })
        .catch((error) => {
          console.error("Error fetching meetings:", error.response ? error.response.data : error.message);
        });
    } else {
      console.log("User or user.idUser is not defined");
    }
  }, [user]);

  return (
    <TableContainer component={Paper} sx={{ mt: 3, p: 2, borderRadius: 2, boxShadow: 3, width: "96%", margin: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meetings.length > 0 ? (
            meetings.map((meeting) => (
              <TableRow key={meeting.id}>
                <TableCell>{meeting.id}</TableCell>
                <TableCell>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Avatar src={meeting.avatar} />
                    <Typography variant="body1">{meeting.name}</Typography>
                  </div>
                </TableCell>
                <TableCell>{meeting.date}</TableCell>
                <TableCell>
                  <Link href={meeting.description.match(/\((.*?)\)/)?.[1]} target="_blank" rel="noopener noreferrer">
                    {meeting.description.split(" - ")[0]}
                  </Link>
                </TableCell>
                <TableCell>
                  <Chip label={meeting.status} color={getStatusClass(meeting.status)} />
                </TableCell>
                <TableCell>
                  {meeting.status === "Finalizado" && (
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography variant="body2">No hay reuniones programadas.</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MeetingTable;
