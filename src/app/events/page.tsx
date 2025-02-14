import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link
} from '@mui/material';
import EventCard from '@/components/EventCard';

function EventsPage() {


  return (
    <Box>
      {/* Top Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Events
          </Typography>
          {/* Additional Nav Items Could Go Here */}
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box sx={{ p: 2, maxWidth: 900, mx: 'auto' }}>

        {/* List of Events */}
        <Box sx={{ mt: 2 }}>
          {/* Example of a Single Event Card */}
          <EventCard />
        </Box>

        {/* Footer or Additional Link */}
      </Box>
    </Box>
  );
}

export default EventsPage;