import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      {/* Bouton pour basculer entre Admin et Utilisateur */}
      <Button
        variant="contained"
        color="secondary"
        sx={{ mb: 2 }}
        onClick={() => setIsAdmin((prev) => !prev)}
      >
        {isAdmin ? 'Passer en Utilisateur' : 'Passer en Administrateur'}
      </Button>

      {isAdmin ? (
        <Box>
          <Button variant="contained" color="primary" sx={{ mb: 2 }}>
            TEST
          </Button>
          <Typography variant="h4" color="primary">
            Dashboard Administrateur
          </Typography>
          <Typography>Bienvenue, administrateur ! Voici vos outils de gestion.</Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="h4" color="primary">
            Dashboard Utilisateur
          </Typography>
          <Typography>Bienvenue sur votre tableau de bord.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
