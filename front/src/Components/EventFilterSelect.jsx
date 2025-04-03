import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const EventFilterSelect = ({ filter, setFilter }) => {
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Box sx={{ mb: 3, width: '100%' }}>
      <FormControl fullWidth>
        <InputLabel id="event-filter-label">Filtrer les événements</InputLabel>
        <Select
          labelId="event-filter-label"
          value={filter}
          onChange={handleChange}
          label="Filtrer les événements"
        >
          <MenuItem value="all">Tous les événements</MenuItem>
          <MenuItem value="closest">Événements les plus proches</MenuItem>
          <MenuItem value="registered">Événements où un bénévole est inscrit</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default EventFilterSelect;
