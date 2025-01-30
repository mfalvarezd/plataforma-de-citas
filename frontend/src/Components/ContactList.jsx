import React, { useState, useEffect } from "react";
import axios from "../api/axios"; // Importa la instancia de axios configurada
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { Search } from "@mui/icons-material";

const ContactList = ({ user }) => {
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [openServices, setOpenServices] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const clientId = localStorage.getItem("clientId"); // Reemplaza con el método que uses para obtener el cliente logueado
  const [startTime, setStartTime] = useState(""); // Hora de inicio en formato "HH:mm"
  const [endTime, setEndTime] = useState(""); // Hora de fin en formato "HH:mm"
  const [contractDate, setContractDate] = useState(""); // Fecha en formato "YYYY-MM-DD"



  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("/users");
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  const fetchServices = async (user) => {
    try {
      const response = await axios.get("/services");
      setServices(response.data.filter(service => service.freelancer_id === user.id));
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]);
    }
  };

  const handleOpenServices = (user) => {
    setSelectedUser(user);
    fetchServices(user);
    setOpenServices(true);
  };

  const handleCloseServices = () => {
    setOpenServices(false);
    setSelectedUser(null);
    setServices([]);
  };

  const handleSelectService = (service) => {
    setSelectedService(service);
    setConfirmDialog(true);
  };

  const handleConfirmContract = async () => {
    if (!selectedService || !selectedUser || !startTime || !endTime || !contractDate) return;

    const isValidTimeFormat = (time) => /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/.test(time);
    if (!isValidTimeFormat(startTime) || !isValidTimeFormat(endTime)) {
      setMessage({ text: "Por favor ingrese las horas en formato válido (HH:mm).", type: "error" });
      return;
    }

    if (!contractDate) {
      setMessage({ text: "Por favor seleccione una fecha.", type: "error" });
      return;
    }

    const contractData = {
      service_id: selectedService.id,
      client_id: user.id, // Reemplazar con el ID del cliente autenticado
      freelancer_id: selectedUser.id,
      status: "pending",
      date: contractDate, // Fecha actual
      start_time: startTime, // Se puede mejorar para que el usuario lo seleccione
      end_time: endTime,
    };

    try {
      const response = await axios.post("/contracts", contractData);
      setMessage({ text: "Contrato creado exitosamente", type: "success" });
    } catch (error) {
      setMessage({ text: "Error al crear el contrato", type: "error" });
    }

    setConfirmDialog(false);
    setSelectedService(null);
    setStartTime("");
    setEndTime("");
    setContractDate("");

  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ width: "98%", p: 2, borderRadius: 2, bgcolor: "white" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Search sx={{ mr: 1, color: "gray" }} />
        <TextField
          fullWidth
          variant="standard"
          placeholder="Buscar contactos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <List>
        <AnimatePresence>
          {filteredContacts.map(contact => (
            <motion.div key={contact.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }}>
              <ListItem sx={{ borderBottom: "1px solid #eee", cursor: "pointer" }} onClick={() => handleOpenServices(contact)}>
                <ListItemAvatar>
                  <Avatar src={contact.avatar || "https://i.pravatar.cc/192"} />
                </ListItemAvatar>
                <ListItemText primary={contact.name} secondary={<Typography variant="body2" color="text.secondary">{contact.status || "Activo"}</Typography>} />
              </ListItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </List>

      {/* Popup de Servicios */}
      <Dialog open={openServices} onClose={handleCloseServices} fullWidth>
        <DialogTitle>Servicios de {selectedUser?.name}</DialogTitle>
        <DialogContent>
          {services.length === 0 ? <Typography>No hay servicios disponibles.</Typography> : (
            <List>
              {services.map(service => (
                <ListItem key={service.id} button onClick={() => handleSelectService(service)}>
                  <ListItemText primary={service.title} secondary={
                    <>
                      <Typography variant="body2">{service.description}</Typography>
                      <Typography variant="body2"><strong>Precio:</strong> ${service.price}</Typography>
                      <Typography variant="body2"><strong>Duración:</strong> {service.created_at} to {service.updated}</Typography>
                    </>
                  } />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseServices} color="primary">Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* Confirmación de creación de contrato */}
      <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
        <DialogTitle>Confirmar Contrato</DialogTitle>
        <DialogContent>
          <Typography>¿Deseas crear un contrato para el servicio "{selectedService?.title}"?</Typography>

          <Box sx={{ mt: 2 }}>
            <Typography>Fecha de contrato:</Typography>
            <TextField
              type="date"
              value={contractDate}
              onChange={(e) => setContractDate(e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography>Hora de inicio (formato HH:mm):</Typography>
            <TextField
              type="text"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="Ej. 09:00"
              fullWidth
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography>Hora de fin (formato HH:mm):</Typography>
            <TextField
              type="text"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              placeholder="Ej. 17:00"
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(false)} color="secondary">Cancelar</Button>
          <Button onClick={handleConfirmContract} color="primary">Aceptar</Button>
        </DialogActions>
      </Dialog>

      {/* Mensaje de éxito o error */}
      <Snackbar open={!!message.text} autoHideDuration={4000} onClose={() => setMessage({ text: "", type: "" })}>
        <Alert severity={message.type} sx={{ width: "100%" }}>
          {message.text}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactList;
