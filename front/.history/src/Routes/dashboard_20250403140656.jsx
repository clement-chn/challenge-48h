import React, { useState } from 'react';
import { Box, Card, CardContent, IconButton, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalCreeEvent from '../Components/ModalCreeEvent';
import HeaderSection from '../Components/HeaderSection'; // Import du nouveau composant

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    description: '',
  });
  const [registeredEvents, setRegisteredEvents] = useState([]);

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

  return (
    <div style={{ backgroundColor: '#1CABE2', minHeight: '100vh' }}> {/* Fond principal */}
      <Box sx={{ maxWidth: '90%', margin: 'auto', mt: 5 }}>
        {/* Utilisation du composant HeaderSection */}
        <HeaderSection onAddEvent={handleOpen} onSendMail={handleSendMail} />

        {/* Liste des événements */}
        {events.map((event) => (
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
    </div>
  );
};

export default AdminDashboard;
