import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const HeaderSection = ({ onAddEvent, onSendMail }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: 2,
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // Colonne pour petits écrans
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 3,
        mb: 3,
        p: 3,
      }}
    >
      <Typography
        variant="h4"
        color="primary"
        sx={{ mb: { xs: 2, sm: 0 } }} // Ajoute un espacement pour les petits écrans
      >
        Dashboard Administrateur
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, // Colonne pour petits écrans
          gap: 1, // Espacement entre les boutons
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={onAddEvent}
          sx={{ width: { xs: '100%', sm: 'auto' } }} // Bouton pleine largeur pour petits écrans
        >
          Ajouter un événement
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSendMail}
          sx={{ width: { xs: '100%', sm: 'auto' } }} // Bouton pleine largeur pour petits écrans
        >
          Envoyer un mail
        </Button>
      </Box>
    </Box>
  );
};

export default HeaderSection;
