import React from 'react';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';

const ModalCreeEvent = ({ open, handleClose, handleSubmit, handleChange, eventData }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-title" variant="h6" sx={{ mb: 2 }}>
          Créer un nouvel événement
        </Typography>

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Titre de l'événement"
            name="title"
            fullWidth
            required
            margin="dense"
            value={eventData.title}
            onChange={handleChange}
          />
          <TextField
            label="Date"
            type="date"
            name="date"
            fullWidth
            required
            margin="dense"
            InputLabelProps={{ shrink: true }}
            value={eventData.date}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            margin="dense"
            value={eventData.description}
            onChange={handleChange}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button variant="contained" color="error" onClick={handleClose}>
              Annuler
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Créer
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalCreeEvent;
