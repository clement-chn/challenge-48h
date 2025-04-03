import React, { useState } from 'react';
import { Box, Card, CardContent, IconButton, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalCreeEvent from '../Components/ModalCreeEvent';
import HeaderSection from '../Components/HeaderSection'; // Import du nouveau composant
import EventFilterSelect from '../Components/EventFilterSelect'; // Import du nouveau composant

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(true); // Ajout de setIsAdmin pour permettre de modifier l'état
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    description: '',
    location: '', // Ajout du champ "location"
  });
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [filter, setFilter] = useState('all'); // État pour le filtre
  const [isFilterApplied, setIsFilterApplied] = useState(false); // État pour savoir si un filtre est appliqué
  const [userLocation, setUserLocation] = useState(null); // Localisation de l'utilisateur

  // Exemple de logique pour basculer entre admin et utilisateur
  const toggleAdmin = () => {
    setIsAdmin((prev) => !prev);
  };

  // Obtenir la localisation de l'utilisateur
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Erreur lors de l'obtention de la localisation :", error);
      }
    );
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEventData({ title: '', date: '', description: '', location: '' });
  };

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, { ...eventData, id: Date.now() }]);
    handleClose();
  };

  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
    setRegisteredEvents(registeredEvents.filter(eventId => eventId !== id));
  };

  const handleRegister = (id) => {
    if (registeredEvents.includes(id)) {
      setRegisteredEvents(registeredEvents.filter(eventId => eventId !== id));
    } else {
      setRegisteredEvents([...registeredEvents, id]);
    }
  };

  const handleSendMail = () => {
    alert('Mail envoyé !');
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    setIsFilterApplied(true); // Activer le filtre après la sélection
  };

  // Calculer la distance entre deux points géographiques
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Rayon de la Terre en km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance en km
  };

  // Filtrer les événements en fonction du filtre sélectionné
  const filteredEvents = events.filter((event) => {
    if (!isFilterApplied) {
      return true; // Affiche tous les événements si aucun filtre n'est appliqué
    }
    if (filter === 'closest' && userLocation) {
      // Trier par distance la plus proche
      const eventLocation = event.location.split(','); // Supposons que la localisation est au format "latitude,longitude"
      const eventLat = parseFloat(eventLocation[0]);
      const eventLon = parseFloat(eventLocation[1]);
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        eventLat,
        eventLon
      );
      return distance <= 50; // Filtrer les événements à moins de 50 km
    }
    if (filter === 'registered') {
      return registeredEvents.includes(event.id);
    }
    return true; // Tous les événements
  });

  return (
    <div >
      <Box sx={{ width: '100%' }}>
        {/* Bouton pour basculer entre admin et utilisateur (à des fins de test) */}
        <Button
          variant="contained"
          color="secondary"
          onClick={toggleAdmin}
          sx={{ mb: 3 }}
        >
          Basculer en {isAdmin ? 'Utilisateur' : 'Admin'}
        </Button>

        {isAdmin ? (
          <>
            {/* Vue pour l'administrateur */}
            <HeaderSection onAddEvent={handleOpen} onSendMail={handleSendMail} />
            {events.length > 0 && (
              <EventFilterSelect filter={filter} setFilter={handleFilterChange} />
            )}
            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                sx={{
                  mb: 2,
                  p: 2,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <CardContent sx={{ width: '100%' }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    {event.date}
                  </Typography>
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {event.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Lieu : {event.location}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 1,
                    width: { xs: '100%', sm: 'auto' },
                  }}
                >
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(event.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    color={registeredEvents.includes(event.id) ? 'error' : 'primary'}
                    onClick={() => handleRegister(event.id)}
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                  >
                    {registeredEvents.includes(event.id) ? 'Se désinscrire' : 'S’inscrire'}
                  </Button>
                </Box>
              </Card>
            ))}
            <ModalCreeEvent
              open={open}
              handleClose={handleClose}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              eventData={eventData}
            />
          </>
        ) : (
          <>
            {/* Vue pour les utilisateurs non administrateurs */}
            <Typography variant="h4" color="primary" sx={{ textAlign: 'center', mt: 5 }}>
              Bienvenue sur votre tableau de bord utilisateur
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', mt: 2 }}>
              Vous n'avez pas les droits administratifs pour gérer les événements.
            </Typography>
          </>
        )}
      </Box>
    </div>
  );
};

export default AdminDashboard;
