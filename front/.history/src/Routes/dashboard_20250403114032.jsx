import React, { useState } from 'react';
import { Button, Typography, Box, Modal, TextField, Card, CardContent, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]); // Liste des événements
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    description: '',
  });

  // Ouvrir et fermer la modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEventData({ title: '', date: '', description: '' }); // Réinitialiser le formulaire
  };

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // Ajouter un nouvel événement
  const handleSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, { ...eventData, id: Date.now() }]); // Ajoute l'événement avec un ID unique
    handleClose();
  };

  // Supprimer un événement
  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" color="primary" sx={{ mb: 3 }}>
        Dashboard Administrateur
      </Typography>

      {/* Bouton pour ajouter un événement */}
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 3 }}>
        Ajouter un événement
      </Button>

      {/* Liste des événements */}
      {events.map((event) => (
        <Card key={event.id} sx={{ mb: 2, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">
              {event.date}
            </Typography>
            <Typography variant="h6">{event.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {event.description}
            </Typography>
          </CardContent>
          {/* Boutons Modifier & Supprimer */}
          <Box>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => handleDelete(event.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Card>
      ))}

      {/* Modal pour ajouter un événement */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" sx={{ mb: 2 }}>
            Créer un nouvel événement
          </Typography>

          {/* Formulaire */}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Titre de l'événement"
              name="title"
              fullWidth
              required
              margin="dense"
              value={eventData.title}
              onChange={handleChange}
            />
            <TextField
              label="Date"
              type="date"
              name="date"
              fullWidth
              required
              margin="dense"
              value={eventData.date}
              onChange={handleChange}
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={3}
              margin="dense"
              value={eventData.description}
              onChange={handleChange}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button variant="contained" color="error" onClick={handleClose}>
                Annuler
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Créer
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminDashboard;
