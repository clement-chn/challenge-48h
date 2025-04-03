import { Box } from '@mui/material';
import React, { useState } from 'react';
import Event from '../components/Event.jsx';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Autour de moi',
  'Inscrit'
];

const events = [
  {
    name: 'Conférence React',
    description: 'Une conférence sur les dernières nouveautés de React.',
    date: '2025-04-05',
    time: '14:00',
    location: 'Paris, France',
  },
  {
    name: 'Atelier Node.js',
    description: 'Un atelier pratique pour apprendre Node.js.',
    date: '2025-04-10',
    time: '10:00',
    location: 'Lyon, France',
  },
  {
    name: 'Hackathon JS',
    description: 'Un hackathon pour les passionnés de JavaScript.',
    date: '2025-04-15',
    time: '09:00',
    location: 'Marseille, France',
  },
];

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  return (
    <Box sx={{ maxWidth: '36rem', margin: 'auto' }}>

      <FormControl sx={{ m: 1, width: 300}}>
        <InputLabel id="demo-multiple-checkbox-label">Filtres</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Filtres" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {events.map((event, index) => (
        <Event
          key={index}
          name={event.name}
          description={event.description}
          date={event.date}
          time={event.time}
          location={event.location}
        />
      ))}
    </Box>
  );
};

export default AdminDashboard;