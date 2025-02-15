import { useState, useEffect } from "react";

export function useHTNEvents<T>(id?: number) {
    const [events, setEvents] = useState<T>([] as T);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error|null>(null);

    useEffect(() => {
        async function fetchEvents() {
            const apiUrl = id ? `https://api.hackthenorth.com/v3/events/${id}` : "https://api.hackthenorth.com/v3/events";
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                setEvents(data)
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, [id]);

    return { events, loading, error };
}