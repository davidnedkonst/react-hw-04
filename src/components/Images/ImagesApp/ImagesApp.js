import { useReducer, useEffect } from "react";
import Button from "../Button";
import Loader from "../Loader";
import ImageModal from "../ImageModal";
import fetchFromUrl from "./Fetch";
import Searchbar from "../Searchbar";
import ImageGallery from "../ImageGallery";
import { stateReducer, showReducer } from "./Reducer";
import STATUS from "./Status";
import ACTION from "./Action";
import { initState, initShow } from "./initState";

import css from "./ImagesApp.module.css";

const TIMEOUT = 2000;

export default function ImagesApp() {

    //General state
    const [state, stateDispatch] = useReducer(stateReducer, initState);
    const [show, showDispatch] = useReducer(showReducer, initShow);

    //Handlers
    const Handler = {
        submit: query => {
            stateDispatch({ type: ACTION.INPUT, value: query });
        },

        reset: event => {
            stateDispatch({ type: ACTION.RESET });
        },

        load: event => {
            stateDispatch({ type: ACTION.LOAD });
        },

        select: selectImage => {
            stateDispatch({ type: ACTION.SELECT, value: selectImage });
        },

        close: () => {
            stateDispatch({ type: ACTION.CLOSE, });
        },
    };

    //Show
    useEffect(
        () => {
            showDispatch({ type: state.status });
        },
        [state.status]
    );

    //Fetch
    useEffect(
        () => {
            const pending = state.status === STATUS.PENDING;
            const loading = state.status === STATUS.LOADING;
            const runFetch = pending || loading;

            if (runFetch) {
                setTimeout(
                    () => {
                        const { query, page, perPage } = state;
                        fetchFromUrl(query, page, perPage)
                            .then(
                                ({ hits, totalHits }) => {
                                    stateDispatch({
                                        type: ACTION.RESPONSE,
                                        value: { newImage: hits, newTotal: totalHits },
                                    });
                                }
                            )
                            .catch(
                                error => {
                                    stateDispatch({ type: ACTION.ERROR, value: error })
                                }
                            );
                    }, TIMEOUT
                );
            };
        },
        [state]
    );

    return (
        <div className={css.ImagesApp}>
            <h2>ImagesApp</h2>

            <Searchbar onSubmit={Handler.submit} />

            <Button
                show={show.showResetButton}
                name="Reset"
                onClick={Handler.reset}
            />

            <Button
                show={show.showLoadButton}
                name="Load"
                onClick={Handler.load}
            />

            <Loader
                show={show.showLoader}
            />

            <ImageGallery
                show={show.showGallery}
                image={state.image}
                onImageClick={Handler.select}
            />

            <ImageModal
                show={show.showModal}
                contentModal={state.selectImage}
                onClose={Handler.close}
            />
        </div>
    );
};