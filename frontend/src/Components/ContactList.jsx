import React, { useState, useEffect } from "react";
import axios from "../api/axios"; // Importa la instancia de axios configurada
import { motion, AnimatePresence } from "framer-motion";
import { TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText, Box, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";

const ContactList = () => {
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Obtener usuarios desde la API
    const fetchContacts = async () => {
      try {
        const response = await axios.get("/users"); // Ajusta el endpoint según tu API
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) =>
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
          {filteredContacts.map((contact) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <ListItem sx={{ borderBottom: "1px solid #eee" }}>
                <ListItemAvatar>
                  <Avatar src={contact.avatar || "https://i.pravatar.cc/192"} />
                </ListItemAvatar>
                <ListItemText
                  primary={contact.name}
                  secondary={<Typography variant="body2" color="text.secondary">{contact.status || "Activo"}</Typography>}
                />
              </ListItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </List>
    </Box>
  );
};

export default ContactList;
