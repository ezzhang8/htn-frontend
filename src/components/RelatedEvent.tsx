"use client";

import React from "react";
import { useHTNEvents } from "@/utils/api";
import { EventInternalCard } from "./EventCard";
import { TEvent } from "@/utils/types";
import { useAuth } from "@/components/auth/AuthContext";

type RelatedEventProps = { eventId: number };
export function RelatedEvent({ eventId }: RelatedEventProps) {
  const user = useAuth();
  const { events: event, loading } = useHTNEvents<TEvent>(eventId);

  if (loading) return;
  if (!user.logged_in && event.permission === "private") return;
  
  return <EventInternalCard event={event} />;
}
