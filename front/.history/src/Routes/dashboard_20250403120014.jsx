import React, { useState } from 'react';
import { Button, Typography, Box, Card, CardContent, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalCreeEvent from '../Components/ModalCreeEvent'; // Import du nouveau composant

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
    <Box sx={{ p: 3 }}>
      {/* Conteneur pour positionner le bouton */}
      <Box sx={{ position: 'absolute', top: 18, right: 16, borderRadius: 1,  p: 1 }}>
        <Button variant="contained" color="success" onClick={handleOpen}> {/* Changement de la couleur en vert */}
          Ajouter un événement
        </Button>
      </Box>

      {/* Bouton pour envoyer un mail */}
      <Box sx={{ position: 'absolute', top: 18, right: 50, borderRadius: 1, p: 1 }}>
        <Button variant="contained" color="primary" onClick={() => alert('Mail envoyé !')}>
          Envoyer un mail
        </Button>
      </Box>

      <Typography variant="h4" color="primary" sx={{ mb: 3, textAlign: 'center' }}>
        Dashboard Administrateur
      </Typography>

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

      {/* Utilisation du composant ModalCreeEvent */}
      <ModalCreeEvent
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        eventData={eventData}
      />
    </Box>
  );
};

export default AdminDashboard;
