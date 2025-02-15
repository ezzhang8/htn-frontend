'use client'
import { useState, useEffect } from 'react';

// A custom React hook for authentication
function useAuthHook() {
    // State to store the user's auth details
    const [auth, setAuth] = useState({ username: null, password: null });
    const logged_in = auth.username == "hacker" && auth.password === "htn2025";

    // Effect to load auth details from localStorage when the component mounts

    // Function to handle user login
    const login = (username, password) => {
        // Save auth details to state
        setAuth({ username, password });
        // Store auth details in localStorage
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('password', password);
        window.location.href = window.location.origin;
    };

    // Function to handle user logout
    const logout = () => {
        // Clear auth details from state
        setAuth({ username: null, password: null });
        // Remove auth details from localStorage
        window.localStorage.removeItem('username');
        window.location.href = window.location.origin;
    };

    useEffect(() => {
        // Get auth details from localStorage
        const username = window.localStorage.getItem('username');
        const password = window.localStorage.getItem('password');

        // If auth details are found, save them to state
        if (username && password) {
            setAuth({ username, password });
        }
    }, []);

    return {
        logged_in,
        login,
        logout
    };
}

export default useAuthHook;