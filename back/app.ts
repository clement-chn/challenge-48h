import express from 'express';
import globalRoutes from './routes/globalRoutes';

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Utiliser les routes globales
app.use('/api/global', globalRoutes);

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});