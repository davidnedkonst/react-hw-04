import { useReducer, useEffect } from "react";
import Button from "../Button";
import Loader from "../Loader";
import ImageModal from "../ImageModal";
import fetchFromUrl from "../fetch";
import Searchbar from "../Searchbar";
import ImageGallery from "../ImageGallery";
import reducer from "../reducer";
import STATUS from "../Status";
import ACTION from "../Action";
import initState from "../initState";

import css from "./ImagesApp.module.css";

const TIMEOUT = 1000;

export default function ImagesApp() {

    //General state
    const [state, dispatch] = useReducer(reducer, initState);

    //Handlers
    const Handler = {
        submit: query => {
            dispatch({ type: ACTION.INPUT, value: query });
        },

        reset: event => {
            dispatch({ type: ACTION.RESET });
        },

        load: event => {
            dispatch({ type: ACTION.LOAD });
        },

        select: selectImage => {
            dispatch({ type: ACTION.SELECT, value: selectImage });
        },

        close: () => {
            dispatch({ type: ACTION.CLOSE, });
        },
    };

    // useEffect(() => {
    //     const isError = error ? true : false;
    //     if (isError) {
    //         setStatus(Status.REJECTED);
    //         console.log(Status.REJECTED);
    //     }
    // }, [error]);

    //Reset error
    // useEffect(
    //     () => {
    //         const isNoError = status === Status.PENDING || status === Status.LOADING || status === Status.RESOLVED;

    //         if (isNoError) setError(initState.error);
    //     },
    //     [error, status]
    // );

    //Fetch
    useEffect(
        () => {
            const runFetch =
                state.status === STATUS.PENDING ||
                state.status === STATUS.LOADING;

            if (runFetch) {
                setTimeout(
                    () => {
                        const { query, page, perPage } = state;
                        fetchFromUrl(query, page, perPage)
                            .then(
                                ({ hits, totalHits }) => {
                                    dispatch({
                                        type: ACTION.RESPONSE,
                                        value: { newImage: hits, newTotal: totalHits },
                                    });
                                }
                            )
                            .catch(
                                error => {
                                    dispatch({
                                        type: ACTION.ERROR,
                                        value: error
                                    })
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
                show={state.showResetButton}
                name="Reset"
                onClick={Handler.reset}
            />

            <Button
                show={state.showLoadButton}
                name="Load"
                onClick={Handler.load}
            />

            <Loader
                show={state.showLoader}
            />

            <ImageGallery
                show={state.showGallery}
                image={state.image}
                onImageClick={Handler.select}
            />

            <ImageModal
                show={state.showModal}
                contentModal={state.selectImage}
                onClose={Handler.close}
            />
        </div>
    );
};