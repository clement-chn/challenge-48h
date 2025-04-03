import React, { useState } from 'react';
import { Button, Typography, Box, Modal, TextField } from '@mui/material';

const AdminDashboard = () => {
  const [open, setOpen] = useState(false); // Gère l'ouverture de la modal
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    description: '',
  });

  // Ouvrir et fermer la modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Événement créé : ${eventData.title} le ${eventData.date}`);
    handleClose(); // Ferme la modal après soumission
  };

  return (
   
         <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
 <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" color="primary" sx={{ mb: 3 }}>
        Dashboard Administrateur
      </Typography>

      {/* Boutons d'actions */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Ajouter un événement
        </Button>
        <Button variant="contained" color="secondary">
          Envoyer un mail
        </Button>
      </Box>

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
            <TextField label="Date" type="date"name="date"fullWidth requiredmargin="dense"
              InputLabelProps={{ shrink: true }}value={eventData.date}
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
    </div>
   
   
   
  );
};

export default AdminDashboard;
