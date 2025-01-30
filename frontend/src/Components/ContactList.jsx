import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText, Box, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";

const contacts = [
  { id: 1, name: "Darcy Patterson", status: "Active now", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Alex Hamilton", status: "Active 3 days ago", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Bowen Group", status: "Active 12 days ago", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "SA Smith", status: "Active now", avatar: "https://i.pravatar.cc/150?img=4" },
  { id: 5, name: "TaDFylor Smith", status: "Active now", avatar: "https://i.pravatar.cc/150?img=4" },
  { id: 6, name: "GFAS Smith", status: "Active now", avatar: "https://i.pravatar.cc/150?img=4" },
];

const ContactList = () => {
  const [search, setSearch] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ width: "98%", p: 2, borderRadius: 2, bgcolor: "white"}}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Search sx={{ mr: 1, color: "gray" }} />
        <TextField
          fullWidth
          variant="standard"
          placeholder="Search contacts..."
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
                  <Avatar src={contact.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={contact.name}
                  secondary={<Typography variant="body2" color="text.secondary">{contact.status}</Typography>}
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
