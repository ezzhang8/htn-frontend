"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid2 as Grid,
  Stack,
  Box,
  CardActions,
  Button,
} from "@mui/material";
import { useParams } from "next/navigation";

import { TEvent } from "@/utils/types";
import { useHTNEvents } from "@/utils/api";

import Navbar from "@/components/Navbar";
import { RelatedEvent } from "@/components/RelatedEvent";
import { formatTimeRange, formatMonthDay } from "@/utils/date";
import { useAuth } from "@/components/auth/AuthContext";
import { redirect } from "next/navigation";

export default function EventPage() {
  const user = useAuth();
  const params = useParams();
  const eventId = params.eventId;
  const { events: event, loading } = useHTNEvents<TEvent>(
    parseInt(eventId as string)
  );

  if (loading) return;
  if (event.permission === "private" && !user.logged_in) redirect("/events");

  return (
    <>
      <Navbar back={true} />
      <title>{event.name}</title>
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
                  {event.speakers.map((speaker, index) =>
                    index > 0 ? " & " + speaker.name : speaker.name
                  )}
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
          <CardActions>
            {event.public_url != "" && (
              <Button
                component="a"
                target="_blank"
                href={event.public_url}
                size="small"
              >
                PUBLIC EVENT URL
              </Button>
            )}
            {event.private_url != "" && user.logged_in && (
              <Button
                component="a"
                target="_blank"
                href={event.private_url}
                size="small"
              >
                PRIVATE EVENT URL
              </Button>
            )}
          </CardActions>
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
        <Box sx={{ my: "50px" }}></Box>
      </Container>
    </>
  );
}
