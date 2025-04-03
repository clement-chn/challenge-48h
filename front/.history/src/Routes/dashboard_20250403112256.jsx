import React from 'react';
import { Button } from '@mui/material';
import '@mui/material/styles'; // Ajout de l'importation des styles

const Dashboard = ({ isAdmin }) => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}> {/* Ajout de styles pour la visibilité */}
      {isAdmin ? (
        <div>
          {/* Version administrateur */}
          <Button variant="contained" color="primary" style={{ marginBottom: '20px',  color: '#1976d2' }}>
            TEST
          </Button>
          <h1 style={{ color: '#1976d2' }}>Dashboard Administrateur</h1> {/* Couleur pour le titre */}
          <p>Bienvenue, administrateur ! Voici vos outils de gestion.</p>
          {/* Ajoutez ici les composants ou fonctionnalités spécifiques à l'admin */}
        </div>
      ) : (
        <div>
          {/* Version utilisateur standard */}
          <h1 style={{ color: '#1976d2' }}>Dashboard Utilisateur</h1> {/* Couleur pour le titre */}
          <p>Bienvenue sur votre tableau de bord.</p>
          {/* Ajoutez ici les composants ou fonctionnalités spécifiques à l'utilisateur */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;