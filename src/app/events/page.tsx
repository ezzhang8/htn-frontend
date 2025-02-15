"use client";
import React from "react";
import { Typography, Box, Container, Stack } from "@mui/material";
import EventCard from "@/components/EventCard";
import Navbar from "@/components/Navbar";
import { useHTNEvents } from "@/utils/api";
import Timeline from "@mui/lab/Timeline";
import { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";
import { useMediaQuery } from "@mui/material";
import { TEvent } from "@/utils/types";

function EventsPage() {
  const { events } = useHTNEvents<TEvent[]>();
  const isMobile = useMediaQuery("(max-width:500px)");

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h4" sx={{ fontWeight: "bold" }}>
            Events
          </Typography>
          {isMobile? (<Stack spacing={2}>

            {events.map((event, index) => {
              return <EventCard key={index} event={event} />;
            })}
          </Stack>) : (
            <Timeline
              position="right"
              sx={{
                [`& .${timelineOppositeContentClasses.root}`]: {
                  flex: 0.1,
                },
              }}
            >
              {events.map((event, index) => {
                return <EventCard key={index} event={event} />;
              })}
            </Timeline>
          )}
        </Box>
      </Container>
    </>
  );
}

export default EventsPage;
