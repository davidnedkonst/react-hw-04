import { useState, useEffect } from "react";
import Section from "../Section";
import Controls from "./Controls";
import Progress from "./Progress";
import Publication from "./Publication";

const LS_READER_ID = "reader_publication_id";

export default function ReaderApp({ items }) {
    const [index, setIndex] = useState(
        JSON.parse(localStorage.getItem(LS_READER_ID)) || 0
    );

    useEffect(
        () => {
            localStorage.setItem(LS_READER_ID, JSON.parse(index));
        },
        [index]
    );

    const changeIndex = value => {
        if (value === -1 && !index) {
            setIndex(s => s + items.length - 1);
            return;
        }
        setIndex(s => s + value);
    };

    return (
        <Section title="Reader">
            <div>
                <Controls
                    current={index + 1}
                    total={items.length}
                    handleClick={changeIndex}
                />

                <Progress
                    current={index + 1}
                    total={items.length}
                />

                <Publication
                    id={items[index].id}
                    title={items[index].title}
                    text={items[index].text}
                />
            </div>
        </Section>
    );

}