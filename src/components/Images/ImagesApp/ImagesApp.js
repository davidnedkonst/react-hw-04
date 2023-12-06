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

export default function ImagesApp({ time = 1000 }) {

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
    //     const runFetch = status === Status.PENDING || status === Status.LOADING;
    //     // const i = image;
    //     // console.log(i);
    //     // const length = i.length;
    //     // console.log("length = "+length);
    //     // const isImage = length > 0;
    //     if (runFetch && image.length > 0) {
    //         setError(initState.error);
    //         setStatus(Status.RESOLVED);
    //         console.log(Status.RESOLVED);
    //     }
    // }, [image, status]);

    // useEffect(() => {
    //     const isUpdatePage = page !== initState.page;
    //     if (isUpdatePage) {
    //         setStatus(Status.LOADING);
    //         console.log(Status.LOADING);
    //     }
    // }, [page]);

    // useEffect(() => {
    //     const isError = error ? true : false;
    //     if (isError) {
    //         setStatus(Status.REJECTED);
    //         console.log(Status.REJECTED);
    //     }
    // }, [error]);

    //Update showing
    // useEffect(
    //     () => {
    //         setShowGallery(status === Status.RESOLVED || status === Status.LOADING);
    //     },
    //     [image, total, status]
    // );

    // useEffect(
    //     () => {
    //         const length = image.length;
    //         console.log("l = " + image.length);
    //         const isShortageImage = length < total && total !== 0;

    //         setShowButton(status === Status.RESOLVED && (image.length < total && total > 0));
    //     },
    //     [image, total, status]
    // );

    // useEffect(
    //     () => {
    //         // const length = image.length;
    //         // console.log("l = " + image.length);
    //         // const isShortageImage = length < total && total !== 0;

    //         setShowLoader(status === Status.PENDING || status === Status.LOADING);
    //     },
    //     [image, total, status]
    // );

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
            const runFetch = state.status === STATUS.PENDING || state.status === STATUS.LOADING;

            if (runFetch) {
                setTimeout(
                    () => {
                        fetchFromUrl(state.query, state.page, state.perPage)
                            .then(
                                ({ hits, totalHits }) => {
                                    dispatch({
                                        type: ACTION.RESPONSE,
                                        value: { newImage: [...hits], newTotal: totalHits },
                                    });
                                }
                            )
                            .catch(error => console.log(error));
                    }, time
                );
            };
        },
        [state, time]
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

            <ImageGallery
                show={state.showGallery}
                image={state.image}
                onImageClick={Handler.select}
            />

            <Button
                show={state.showLoadButton}
                name="Load"
                onClick={Handler.load}
            />

            <Loader
                show={state.showLoader}
            />

            <ImageModal
                show={state.showModal}
                contentModal={state.selectImage}
                onClose={Handler.close}
            />
        </div>
    );
};