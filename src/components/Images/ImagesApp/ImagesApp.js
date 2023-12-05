import { useState, useReducer, useEffect } from "react";
import Button from "../Button";
import Loader from "../Loader";
import ImageModal from "../ImageModal";
import fetchFromUrl from "../fetch";
import Searchbar from "../Searchbar";
import ImageGallery from "../ImageGallery";
import { Status } from "../../../utils";

import css from "./ImagesApp.module.css";

const initState = {
    query: null,
    image: [],
    total: 0,
    page: 1,
    perPage: 12,
    activeImage: null,
};

const initStatus = {
    status: Status.IDLE,
    showModal: false,
    showGallery: false,
    showButton: false,
    showLoader: false,
    error: null,
};

const reducerState = (state, action) => {
    switch (action.type) {
        case 'query':
            return ({ ...initState, query: action.query, });
            break;

        case 'image':
            return ({ ...initState, image: [...state.image, ...action.image], });
            break;

        case 'page':
            return ({ ...initState, page: state.page + 1, });
            break;

        case 'activeImage':
            return ({ ...initState, activeImage: action.activeImage, });
            break;

        default:
            break;
    }
};
const reducerStatus = (state, action) => {
    switch (action.type) {
        case 'status':
            return ;
            break;

        default:
            break;
    }
};

export default function ImagesApp({ time = 1000 }) {

    //General state
    const [state, setState] = useReducer(reducerState, initState);
    const [status, setStatus] = useReducer(reducerStatus, initStatus);

    //Reset
    // const resetState = () => {
    //     setQuery(initState.query);
    //     setImage(initState.images);
    //     setTotal(initState.total);
    //     setPage(initState.page);
    //     setPerPage(initState.perPage);
    //     setShowModal(initState.showModal);
    //     setContentModal(initState.contentModal);
    //     setError(initState.error);
    //     setStatus(Status.IDLE);
    // };

    const handleSubmit = query => {
        if (query) {
            setState({ type: 'query', query });
        }
    };

    const handleLoadClick = event => {
        const isShortageImage = state.image.length < state.total;
        if (isShortageImage) {
            setState({ type: 'page' });
        }
    };

    const handleImageClick = activeImage => {
        if (activeImage) {
            setState({ type: 'activeImage', activeImage });
        }
    };

    const closeModal = () => {
        // setShowModal(initState.showModal);
        setState({ type: 'activeImage', activeImage: initState.activeImage });
        setStatus({ type: 'showModal', showModal: false, });
    };

    //Update status
    // useEffect(() => {
    //     const isUpdateQuery = query !== initState.query;
    //     if (isUpdateQuery) {
    //         setError(initState.error);
    //         setImage(initState.image);
    //         setStatus(Status.PENDING);
    //         console.log(Status.PENDING);
    //     }
    // }, [query]);

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
    // useEffect(
    //     () => {
    //         const runFetch = status.status === Status.PENDING || status.status === Status.LOADING;

    //         if (runFetch) {
    //             setTimeout(
    //                 () => {
    //                     fetchFromUrl(state.query, state.page, state.perPage)
    //                         .then(
    //                             ({ hits, totalHits }) => {
    //                                 const shortageImage = totalHits - image.length;
    //                                 const newImage = shortageImage >= perPage ? hits : hits.slice(0, shortageImage);
    //                                 setImage([...image, ...newImage]);
    //                                 setTotal(totalHits);
    //                             }
    //                         )
    //                         .catch(error => setError(error));
    //                 }, time
    //             );
    //         };
    //     },
    //     [state.query, state.page, state.perPage, state.image, status.error, status.status, time]
    // );

    return (
        <div className={css.ImagesApp}>
            <h2>ImagesApp</h2>
            <Searchbar onSubmit={handleSubmit} />
            <ImageGallery
                show={status.showGallery}
                image={state.image}
                onImageClick={handleImageClick}
            />
            <Button
                show={status.showButton}
                onLoadClick={handleLoadClick}
            />
            <Loader
                show={status.showLoader}
            />
            <ImageModal
                show={status.showModal}
                contentModal={state.contentModal}
                onClose={closeModal}
            />
        </div>
    )
};