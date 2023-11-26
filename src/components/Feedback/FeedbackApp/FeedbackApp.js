import { useState } from "react";
import Statistics from "../Statistics";
import FeedbackOptions from "../FeedbackOptions";
import Section from "../../Section";

export default function FeedbackApp() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const options = { good, neutral, bad };

    const updateOptions = (option) => {
        switch (option) {
            case "good":
                setGood(s => s + 1);
                break;
            case "neutral":
                setNeutral(s => s + 1);
                break;
            case "bad":
                setBad(s => s + 1);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <h2>Component Feedback</h2>
            
            <Section title={'Please leave feedback'}>
                <FeedbackOptions
                    options={options}
                    onLeaveFeedback={updateOptions}
                />
            </Section>

            <Section title={'Statistics'}>
                <Statistics options={options} />
            </Section>
        </div>
    );
};