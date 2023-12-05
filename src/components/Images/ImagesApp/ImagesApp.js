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
    images: [],
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
    const [query, setQuery] = useState(initState.query);
    const [image, setImage] = useState(initState.images);
    const [total, setTotal] = useState(initState.total);
    const [page, setPage] = useState(initState.page);
    const [perPage, setPerPage] = useState(initState.perPage);
    const [showModal, setShowModal] = useState(initState.showModal);
    const [contentModal, setContentModal] = useState(initState.contentModal);
    const [showGallery, setShowGallery] = useState(initState.showGallery);
    const [showButton, setShowButton] = useState(initState.showButton);
    const [showLoader, setShowLoader] = useState(initState.showLoader);
    const [error, setError] = useState(initState.error);
    const [status, setStatus] = useState(Status.IDLE);

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

    //Update status and reset error
    useEffect(
        () => {
            const isUpdateQuery = query !== initState.query;
            const isUpdatePage = page !== initState.page;
            const isError = error ? true : false;

            if (isUpdateQuery) setStatus(Status.PENDING);
            if (isUpdatePage) setStatus(Status.LOADING);
            if (isError) setStatus(Status.REJECTED);
        },
        [status, query, page, error]
    );

    //Update showing and reset
    useEffect(
        () => {
            setShowGallery(status === Status.RESOLVED || status === Status.LOADING);
            setShowButton(status === Status.RESOLVED && image.length < total && total !== 0);
            setShowLoader(status === Status.PENDING || status === Status.LOADING);

            if (
                status === Status.PENDING ||
                status === Status.LOADING ||
                status === Status.RESOLVED
            ) setError(initState.error);
        },
        [status, image, total]
    );

    //Fetch
    useEffect(
        () => {
            if (status === Status.PENDING || status === Status.LOADING) {
                setTimeout(
                    () => {
                        fetchFromUrl(query, page, perPage)
                            .then(
                                ({ hits, totalHits }) => {
                                    const shortageImage = totalHits - image.length;
                                    const newImage = shortageImage >= perPage ? hits : hits.slice(0, shortageImage);
                                    setImage([...image, ...newImage]);
                                    setTotal(totalHits);
                                    setStatus(Status.RESOLVED);
                                }
                            )
                            .catch(error => setError(error));
                    }, time
                );
            }
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