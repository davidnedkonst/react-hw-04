import { useState } from "react";
import Section from "../Section";
import VideoList from "./VideoList";
import Player from "./Player";

import videos from "../../constants/videos.json";

export default function PlayerApp() {
    const [video, setVideo] = useState(null);

    const selectVideo = link => {
        console.log("Select video: ", link);
        setVideo(link);
    };

    const title = `Selected video: ${video}`;

    return (
        <Section title="PlayerApp">
            {video && <h4>{title}</h4>}
            <VideoList
                data={videos}
                select={selectVideo}
            />

            <Player url={video} />
        </Section>
    );
};