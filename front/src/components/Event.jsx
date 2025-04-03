import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const Event = (props) => {

  return (
    <Box className="events" sx={{boxShadow: { xs: 3, sm: 3 }, borderRadius: "15px", padding: '20px', margin: '20px', display: "flex", flexDirection: 'column'}}>
      <Typography variant="h2" component="h2" sx={{fontSize: '2rem', fontWeight: 'bold'}}>{props.name}</Typography>
      <Typography
        variant="h4" 
        component="p"
        sx={{
          margin: '1rem',
          fontSize: '1rem',
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}>
          {props.description}
      </Typography>
      <Button variant='contained' sx={{alignSelf: "self-end"}}>S'inscrire</Button>
    </Box>
  );
}
export default Event;