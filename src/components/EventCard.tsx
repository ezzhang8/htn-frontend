"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Avatar,
  AvatarGroup,
  Grid2 as Grid,
  Tooltip,
  Link
} from "@mui/material";

import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

import { TEvent } from "@/utils/types";
import { formatTimeRange, formatMonthDay, formatWeekday, formatTimeDifference } from "@/utils/date";
import { useTruncateText } from "@/utils/truncate";
import { stringAvatar } from "@/utils/avatar";
import { useMediaQuery } from "@mui/material";

type EventCardProps = { event: TEvent };

export function EventInternalCard({ event }: EventCardProps) {
  const isMobile = useMediaQuery("(max-width:500px)");
  const truncatedDescription = useTruncateText(event.description || "", isMobile ? 1 : 2);

  return (
    <Card variant="outlined">
      <CardActionArea disableRipple>
        <Link href={`/events/${event.id}`} underline="none">
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
                {formatTimeRange(event.start_time, event.end_time)}
              </Typography>
              <Typography variant="h6" component="div" gutterBottom>
                {event.name}
              </Typography>
            </Grid>
            <Grid size={6}>
              <AvatarGroup total={event.speakers.length}>
                {event.speakers.map((speaker, index) => (
                  <Tooltip title={speaker.name} key={index}>
                    <Avatar key={index} {...stringAvatar(speaker.name)} />
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Grid>
          </Grid>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {truncatedDescription}
          </Typography>
          <Typography variant="body2">{formatTimeDifference(event.start_time, event.end_time) }{event.event_type.replace(/_/g, " ")}</Typography>
        </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}

export default function EventCard({ event }: EventCardProps) {
  const isMobile = useMediaQuery("(max-width:500px)");

  return isMobile ? (
    <EventInternalCard event={event} />
  ) : (
    <TimelineItem>
      <TimelineOppositeContent
        sx={{ m: "auto 0", textAlign: "left" }}
        align="center"
        variant="body2"
        color="text.secondary"
      >
        {formatWeekday(event.start_time)}
        <br />

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {formatMonthDay(event.start_time)}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot></TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        <EventInternalCard event={event} />
      </TimelineContent>
    </TimelineItem>
  );
}
