import { useState, useEffect } from "react";

export default function useLocalStorage(key, defaultValue = null) {
    const { localStorage } = window;

    const [state, setState] = useState(
        () => {
            return JSON.parse(localStorage.getItem(key)) || defaultValue;
        }
    );

    useEffect(
        () => {
            localStorage.setItem(key, JSON.stringify(state));
        },
        [key, state, localStorage]
    );

    return [state, setState];
};