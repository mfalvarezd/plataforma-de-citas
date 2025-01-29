import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Chip, Typography, Link, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const meetings = [
  {
    id: "#1001",
    avatar: "https://i.pravatar.cc/50?img=1",
    name: "Juan Pérez",
    date: "12/02/2024",
    description: "Revisión de proyecto - [Enlace](https://meet.google.com/abc-defg-hij)",
    status: "Finalizado",
  },
  {
    id: "#1002",
    avatar: "https://i.pravatar.cc/50?img=2",
    name: "Ana Gómez",
    date: "15/02/2024",
    description: "Planificación de sprint - [Enlace](https://zoom.us/j/123456789)",
    status: "En proceso",
  },
  {
    id: "#1003",
    avatar: "https://i.pravatar.cc/50?img=3",
    name: "Carlos López",
    date: "18/02/2024",
    description: "Seguimiento de tareas - [Enlace](https://teams.microsoft.com/l/meetup-join/abc-xyz)",
    status: "Cancelado",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Finalizado":
      return "success";
    case "En proceso":
      return "warning";
    case "Cancelado":
      return "error";
    default:
      return "default";
  }
};

const MeetingTable = () => {
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
          {meetings.map((meeting) => (
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
                <Chip label={meeting.status} color={getStatusColor(meeting.status)} />
              </TableCell>
              <TableCell>
                {meeting.status === "Finalizado" && (
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MeetingTable;
