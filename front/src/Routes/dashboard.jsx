import React from 'react';
import { useState } from 'react';
import { Box } from '@mui/material';
 
const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <Box>
      <p>Test dashboard</p>
      {isAdmin ? (
        <div>
          {/* Version administrateur */}
          <h1>Dashboard Administrateur</h1>
          <p>Bienvenue, administrateur ! Voici vos outils de gestion.</p>
          {/* Ajoutez ici les composants ou fonctionnalités spécifiques à l'admin */}
        </div>
      ) : (
        <div>
          {/* Version utilisateur standard */}
          <h1>Dashboard Utilisateur</h1>
          <p>Bienvenue sur votre tableau de bord.</p>
          {/* Ajoutez ici les composants ou fonctionnalités spécifiques à l'utilisateur */}
        </div>
      )}
    </Box>
  );
};
 
export default Dashboard;