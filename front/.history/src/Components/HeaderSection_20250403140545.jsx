import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const HeaderSection = ({ onAddEvent, onSendMail }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#ffffff', // Fond blanc
        borderRadius: 2,
        p: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 3,
        mb: 3,
      }}
    >
      <Typography variant="h4" color="primary">
        Dashboard Administrateur
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="success"
          onClick={onAddEvent}
          sx={{ mr: 2 }}
        >
          Ajouter un événement
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSendMail}
        >
          Envoyer un mail
        </Button>
      </Box>
    </Box>
  );
};

export default HeaderSection;
