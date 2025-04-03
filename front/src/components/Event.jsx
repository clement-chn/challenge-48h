import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const Event = () => {
  return (
    <Box className="events" sx={{border: '1px solid gray', borderRadius: "15px", padding: '20px', margin: '20px', display: "flex", flexDirection: 'column', backgroundColor: 'white'}}>
      <Typography variant="h2" component="h2" sx={{fontSize: '2rem', fontWeight: 'bold'}}>Evénement</Typography>
      <Typography variant="h4" component="p" sx={{ margin: '1rem', fontSize: '1rem', overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit labore quasi, maxime rem, quae, accusamus asperiores nulla aut vero quia est reiciendis laudantium sed qui unde incidunt quis ducimus ab.</Typography>
      <Button variant="contained" sx={{alignSelf: "self-end"}}>S'inscrire</Button>
    </Box>
  );
}
export default Event;