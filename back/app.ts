import express from 'express';
import cors from 'cors';
import globalRoutes from './routes/globalRoutes';

const app = express();

// Middleware pour activer CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware pour parser le JSON
app.use(express.json());

// Utilisation des routes globales
app.use('/api', globalRoutes);

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});