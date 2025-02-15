"use client";

import React from "react";
import { useHTNEvents } from "@/utils/api";
import { EventInternalCard } from "./EventCard";
import { TEvent } from "@/utils/types";

type RelatedEventProps = { eventId: number };
export function RelatedEvent({ eventId }: RelatedEventProps) {
  const { events: event, loading } = useHTNEvents<TEvent>(eventId);

  if (loading) return;

  return <EventInternalCard event={event} />;
}
