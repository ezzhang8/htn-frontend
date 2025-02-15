"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid2 as Grid,
  Stack,
} from "@mui/material";
import { useParams } from "next/navigation";

import { TEvent } from "@/utils/types";
import { useHTNEvents } from "@/utils/api";

import Navbar from "@/components/Navbar";
import { RelatedEvent } from "@/components/RelatedEvent";
import { formatTimeRange, formatMonthDay } from "@/utils/date";
export default function EventPage() {
  const params = useParams(); // Get the dynamic route params
  const eventId = params.eventId; // Extract eventId
  const { events: event, loading } = useHTNEvents<TEvent>(
    parseInt(eventId as string)
  );

  console.log(event);

  if (loading) return;

  return (
    <>
      <Navbar />
      <Container>
        <Typography gutterBottom variant="h4" sx={{ fontWeight: "bold" }}>
          {event.name}
        </Typography>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  {formatMonthDay(event.start_time)}
                  {", "}
                  {formatTimeRange(event.start_time, event.end_time)}
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  gutterBottom
                ></Typography>
              </Grid>
              <Grid size={6}>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 14,
                    textAlign: "right",
                    fontWeight: "bold",
                  }}
                >
                  Presented by{" "}
                  {event.speakers.map((speaker, index) => (index > 0 ? " & " + speaker.name :  speaker.name) )}
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  gutterBottom
                ></Typography>
              </Grid>
            </Grid>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}></Typography>
            <Typography variant="body2">{event.description}</Typography>
          </CardContent>
        </Card>

        <Typography variant="h5" sx={{ my: "25px", fontWeight: "bold" }}>
          Related Events
        </Typography>
        <Stack spacing={2}>
          {event.related_events &&
            event.related_events.map((relatedEvent, index) => {
              return <RelatedEvent key={index} eventId={relatedEvent} />;
            })}
        </Stack>
      </Container>
    </>
  );
}
