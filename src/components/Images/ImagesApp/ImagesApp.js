import { useReducer, useEffect } from "react";
import Button from "../Button";
import Loader from "../Loader";
import ImageModal from "../ImageModal";
import fetchFromUrl from "./Fetch";
import Searchbar from "../Searchbar";
import ImageGallery from "../ImageGallery";
import reducer from "./Reducer";
import STATUS from "./Status";
import ACTION from "./Action";
import initState from "./initState";

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
                                    dispatch({
                                        type: ACTION.RESPONSE,
                                        value: { newImage: hits, newTotal: totalHits },
                                    });
                                }
                            )
                            .catch(
                                error => {
                                    dispatch({ type: ACTION.ERROR, value: error })
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