import { useState, useEffect, useRef } from "react";
import Section from "../Section";

export default function ClockApp() {
    const [run, setRun] = useState(false);
    const [time, setTime] = useState(() => new Date());
    let intervalId = useRef(null);

    useEffect(
        () => {
            if (run) startTime();
            if (!run) stopTime();

            return (() => stopTime());
        },
        [run]
    );

    const startTime = () => {
        intervalId = setInterval(
            () => setTime(new Date()),
            1000
        )
    };

    const stopTime = () => {
        clearInterval(intervalId);
    };

    return (
        <Section title='Clock App'>
            <button type="button" onClick={() => setRun(true)}>
                Start
            </button>
            <p>
                {time.toString()}
            </p>
            <button type="button" onClick={() => setRun(false)}>
                Stop
            </button>
        </Section>
    )
}