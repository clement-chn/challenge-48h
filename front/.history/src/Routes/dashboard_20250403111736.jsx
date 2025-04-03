import { Button } from '@mui/material';
import React from 'react';
 
const Dashboard = ({ isAdmin }) => {
  return (
    <div>
      {isAdmin ? (
        <div>
          {/* Version administrateur */}
          <Button variant="contained" color="primary">TEST</Button>
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
    </div>
  );
};
 
export default Dashboard;