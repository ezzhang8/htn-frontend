"use client";
import React, { useState } from "react";
import {
  Typography,
  Box,
  Container,
  Stack,
  ButtonGroup,
  Button,
} from "@mui/material";
import EventCard from "@/components/EventCard";
import Navbar from "@/components/Navbar";
import { useHTNEvents } from "@/utils/api";
import Timeline from "@mui/lab/Timeline";
import { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";
import { useMediaQuery } from "@mui/material";
import { TEvent } from "@/utils/types";
import { useAuth } from "@/components/auth/AuthContext";

function EventsPage() {
  const user = useAuth();
  const { events } = useHTNEvents<TEvent[]>();
  const isMobile = useMediaQuery("(max-width:500px)");
  const [filter, setFilter] = useState({
    label: "All",
    filterFn: (event: TEvent) => {
      return Boolean(event);
    },
  });

  return (
    <>
      <Navbar />
      <title>Events</title>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h4" sx={{ fontWeight: "bold" }}>
            Events
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Button
                onClick={() =>
                  setFilter({
                    label: "All",
                    filterFn: () => true,
                  })
                }
                variant={filter.label == "All" ? "contained" : "outlined"}
              >
                All
              </Button>
              <Button
                onClick={() =>
                  setFilter({
                    label: "Activity",
                    filterFn: (event: TEvent) =>
                      event.event_type === "activity",
                  })
                }
                variant={filter.label == "Activity" ? "contained" : "outlined"}
              >
                Activity
              </Button>
              <Button
                onClick={() =>
                  setFilter({
                    label: "Workshop",
                    filterFn: (event: TEvent) =>
                      event.event_type === "workshop",
                  })
                }
                variant={filter.label == "Workshop" ? "contained" : "outlined"}
              >
                Workshop
              </Button>
              <Button
                onClick={() =>
                  setFilter({
                    label: "Tech Talk",
                    filterFn: (event: TEvent) =>
                      event.event_type === "tech_talk",
                  })
                }
                variant={filter.label == "Tech Talk" ? "contained" : "outlined"}
              >
                Tech Talk
              </Button>
            </ButtonGroup>
          </Box>
          {isMobile ? (
            <Stack spacing={2}>
              {events
                .filter(
                  (event) => event.permission === "public" || user.logged_in
                )
                .filter(
                  (event) => filter.filterFn(event)
                )
                .map((event, index) => {
                  return <EventCard key={index} event={event} />;
                })}
            </Stack>
          ) : (
            <Timeline
              position="right"
              sx={{
                [`& .${timelineOppositeContentClasses.root}`]: {
                  flex: 0.1,
                },
              }}
            >
              {events
                .filter(
                  (event) => event.permission === "public" || user.logged_in
                )
                .filter(
                  (event) => filter.filterFn(event)
                )
                .map((event, index) => {
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
