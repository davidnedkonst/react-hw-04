import React, { Component, useState, useEffect } from "react";
// import Statistics from "../Statistics";
// import FeedbackOptions from "../FeedbackOptions";
import Section from "../../Section";
import { FirstToUpperCase } from "../../../utils";

export default function FeedbackApp() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h2>Component Feedback</h2>

            <Section title={'Please leave feedback'}>
                <div className="FeedbackOptions">
                    <button
                        className="FeedbackOption__button"
                        onClick={() => setGood(s => s + 1)}
                    >good
                    </button>
                    <button
                        className="FeedbackOption__button"
                        onClick={() => setNeutral(s => s + 1)}
                    >neutral
                    </button>
                    <button
                        className="FeedbackOption__button"
                        onClick={() => setBad(s => s + 1)}
                    >bad
                    </button>
                </div>
            </Section>

            {/* <Section title={'Statistics'}>
                <Statistics
                    options={state}
                />
            </Section> */}
        </div>
    );
};