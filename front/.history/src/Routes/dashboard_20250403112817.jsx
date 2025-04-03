import React from 'react';
import { Button, Typography, Box } from '@mui/material';

const AdminDashboard = () => {
  const handleAddEvent = () => {
    alert("Ajout d'un événement...");
    // Ici, tu pourras ajouter une logique pour ouvrir un formulaire ou une modal
  };

  const handleSendMail = () => {
    alert("Envoi d'un mail...");
    // Ici, tu pourras intégrer une logique pour envoyer un e-mail
  };

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" color="primary" sx={{ mb: 3 }}>
        Dashboard Administrateur
      </Typography>

      {/* Boutons d'actions */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
        <Button variant="contained" color="primary" onClick={handleAddEvent}>
          Ajouter un événement
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSendMail}>
          Envoyer un mail
        </Button>
      </Box>

      {/* Zone pour afficher d'autres éléments */}
      <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
        <Typography variant="body1">
          Ici, tu pourras afficher la liste des événements, les emails envoyés, etc.
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
