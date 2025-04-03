import React, { useState } from 'react';
import { Box, Card, CardContent, IconButton, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalCreeEvent from '../Components/ModalCreeEvent';
import HeaderSection from '../Components/HeaderSection'; // Import du nouveau composant
import EventFilterSelect from '../components/EventFilterSelect'; // Import du nouveau composant
import Event from '../components/Event'; // Import du composant Event

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    description: '',
  });
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [filter, setFilter] = useState('all'); // État pour le filtre
  const [isFilterApplied, setIsFilterApplied] = useState(false); // État pour savoir si un filtre est appliqué

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEventData({ title: '', date: '', description: '' });
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

  // Filtrer les événements en fonction du filtre sélectionné
  const filteredEvents = events.filter((event) => {
    if (!isFilterApplied) {
      return true; // Affiche tous les événements si aucun filtre n'est appliqué
    }
    if (filter === 'closest') {
      // Trier par date la plus proche
      return true; // Ajoutez une logique pour trier par date
    }
    if (filter === 'registered') {
      return registeredEvents.includes(event.id);
    }
    return true; // Tous les événements
  });

  return (
    <div style={{ backgroundColor: '#1CABE2', minHeight: '100vh' }}> {/* Fond principal */}
      <Box sx={{ width: '100%' }}> {/* Conteneur parent pour permettre la largeur complète */}
        {/* Utilisation du composant HeaderSection */}
        <HeaderSection onAddEvent={handleOpen} onSendMail={handleSendMail} />

        {/* Afficher le composant EventFilterSelect uniquement s'il y a des événements */}
        {events.length > 0 && (
          <EventFilterSelect filter={filter} setFilter={handleFilterChange} />
        )}

        {/* Liste des événements filtrés */}
        {filteredEvents.map((event) => (
          <Card key={event.id} sx={{ mb: 2, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                {event.date}
              </Typography>
              <Typography variant="h6">{event.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {event.description}
              </Typography>
            </CardContent>
            <Box>
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
                sx={{ ml: 1 }}
              >
                {registeredEvents.includes(event.id) ? 'Se désinscrire' : 'S’inscrire'}
              </Button>
            </Box>
          </Card>
        ))}

        {/* Utilisation du composant ModalCreeEvent */}
        <ModalCreeEvent
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          eventData={eventData}
        />
      </Box>

      <Event />
    </div>
  );
};

export default AdminDashboard;
