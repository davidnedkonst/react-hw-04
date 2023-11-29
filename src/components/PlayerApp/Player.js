import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import styled from "@emotion/styled";
import Section from "../Section";

const loadMsg = "Идет загрузка видео...";

const PlayerWrapper = styled.div({
    position: "relative",
    paddingTop: "50%"
});

const StyledPlayer = styled(ReactPlayer)({
    position: "absolute",
    top: "0",
    left: "0"
});

export default function Player({ url }) {
    const [isLoadedVideo, setIsLoadedVideo] = useState(false);

    useEffect(
        () => {
            console.log("Url did update");
            setIsLoadedVideo(false);
        },
        [url]
    );

    const showLoader = url && !isLoadedVideo;
    const playerSize = isLoadedVideo ? "100%" : "0";

    return (
        <Section title="Player">
            {showLoader && <h4>{loadMsg}</h4>}
            {url &&
                <PlayerWrapper>
                    <StyledPlayer
                        url={url}
                        onReady={() => setIsLoadedVideo(true)}
                        width={playerSize}
                        height={playerSize}
                        controls
                    />
                </PlayerWrapper>}
        </Section>
    );
};