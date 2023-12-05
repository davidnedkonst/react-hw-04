import { useState, useEffect } from "react";
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
    showModal: false,
    showGallery: false,
    showButton: false,
    showLoader: false,
    contentModal: null,
    error: null,
    status: Status.IDLE,
};

export default function ImagesApp({ time = 1000 }) {

    //General state
    const [query, setQuery] = useState(initState.query);
    const [image, setImage] = useState(initState.image);
    const [total, setTotal] = useState(initState.total);
    const [page, setPage] = useState(initState.page);
    const [perPage, setPerPage] = useState(initState.perPage);
    const [contentModal, setContentModal] = useState(initState.contentModal);
    const [error, setError] = useState(initState.error);

    //General status
    const [status, setStatus] = useState(Status.IDLE);

    //Showing state
    const [showModal, setShowModal] = useState(initState.showModal);
    const [showGallery, setShowGallery] = useState(initState.showGallery);
    const [showButton, setShowButton] = useState(initState.showButton);
    const [showLoader, setShowLoader] = useState(initState.showLoader);

    //
    const resetState = () => {
        setQuery(initState.query);
        setImage(initState.images);
        setTotal(initState.total);
        setPage(initState.page);
        setPerPage(initState.perPage);
        setShowModal(initState.showModal);
        setContentModal(initState.contentModal);
        setError(initState.error);
        setStatus(Status.IDLE);
    };

    const handleSubmit = query => {
        resetState();
        if (query) setQuery(query);
    };

    const handleLoadClick = event => {
        if (image.length < total) {
            setPage(s => s + 1);
        }
    };

    const handleImageClick = image => {
        if (image) {
            setShowModal(true);
            setContentModal(image);
        }
    };

    const closeModal = () => {
        setShowModal(initState.showModal);
        setContentModal(initState.contentModal);
    };

    //Update status
    useEffect(() => {
        const isUpdateQuery = query !== initState.query;
        if (isUpdateQuery) {
            setError(initState.error);
            setImage(initState.image);
            setStatus(Status.PENDING);
            console.log(Status.PENDING);
        }
    }, [query]);

    useEffect(() => {
        const runFetch = status === Status.PENDING || status === Status.LOADING;
        // const i = image;
        // console.log(i);
        // const length = i.length;
        // console.log("length = "+length);
        // const isImage = length > 0;
        if (runFetch && image.length > 0) {
            setError(initState.error);
            setStatus(Status.RESOLVED);
            console.log(Status.RESOLVED);
        }
    }, [image, status]);

    useEffect(() => {
        const isUpdatePage = page !== initState.page;
        if (isUpdatePage) {
            setStatus(Status.LOADING);
            console.log(Status.LOADING);
        }
    }, [page]);

    useEffect(() => {
        const isError = error ? true : false;
        if (isError) {
            setStatus(Status.REJECTED);
            console.log(Status.REJECTED);
        }
    }, [error]);

    //Update showing
    useEffect(
        () => {
            setShowGallery(status === Status.RESOLVED || status === Status.LOADING);
        },
        [image, total, status]
    );

    useEffect(
        () => {
            const length = image.length;
            console.log("l = " + image.length);
            const isShortageImage = length < total && total !== 0;

            setShowButton(status === Status.RESOLVED && (image.length < total && total > 0));
        },
        [image, total, status]
    );

    useEffect(
        () => {
            // const length = image.length;
            // console.log("l = " + image.length);
            // const isShortageImage = length < total && total !== 0;

            setShowLoader(status === Status.PENDING || status === Status.LOADING);
        },
        [image, total, status]
    );

    //Reset error
    useEffect(
        () => {
            const isNoError = status === Status.PENDING || status === Status.LOADING || status === Status.RESOLVED;

            if (isNoError) setError(initState.error);
        },
        [error, status]
    );

    //Fetch
    useEffect(
        () => {
            const runFetch = status === Status.PENDING || status === Status.LOADING;

            if (runFetch) {
                setTimeout(
                    () => {
                        fetchFromUrl(query, page, perPage)
                            .then(
                                ({ hits, totalHits }) => {
                                    const shortageImage = totalHits - image.length;
                                    const newImage = shortageImage >= perPage ? hits : hits.slice(0, shortageImage);
                                    setImage([...image, ...newImage]);
                                    setTotal(totalHits);
                                }
                            )
                            .catch(error => setError(error));
                    }, time
                );
            };
        },
        [query, page, perPage, image, error, status, time]
    );

    return (
        <div className={css.ImagesApp}>
            <h2>ImagesApp</h2>
            <Searchbar onSubmit={handleSubmit} />
            <ImageGallery
                show={showGallery}
                image={image}
                onImageClick={handleImageClick}
            />
            <Button
                show={showButton}
                onLoadClick={handleLoadClick}
            />
            <Loader
                show={showLoader}
            />
            <ImageModal
                show={showModal}
                contentModal={contentModal}
                onClose={closeModal}
            />
        </div>
    )
};