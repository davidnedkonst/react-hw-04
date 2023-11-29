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
    status: Status.idle,
};

export default function ImagesApp({ time = 1000 }) {
    const [query, setQuery] = useState(initState.query);
    const [image, setImage] = useState(initState.images);
    const [total, setTotal] = useState(initState.total);
    const [page, setPage] = useState(initState.page);
    const [perPage, setPerPage] = useState(initState.perPage);
    const [showModal, setShowModal] = useState(initState.showModal);
    const [contentModal, setcontentModal] = useState(initState.contentModal);
    const [showGallery, setShowGallery] = useState(initState.showGallery);
    const [showButton, setShowButton] = useState(initState.showButton);
    const [showLoader, setShowLoader] = useState(initState.showLoader);
    const [error, setError] = useState(initState.error);
    const [status, setStatus] = useState(Status.idle);

    const resetState = () => {
        setQuery(initState.query);
        setImage(initState.images);
        setTotal(initState.total);
        setPage(initState.page);
        setPerPage(initState.perPage);
        setShowModal(initState.showModal);
        setcontentModal(initState.contentModal);
        setError(initState.error);
        setStatus(Status.idle);
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
            setcontentModal(image);
        }
    };

    const closeModal = () => {
        setShowModal(initState.showModal);
        setcontentModal(initState.contentModal);
    };

    useEffect(
        () => {
            const isUpdateQuery = query !== initState.query;
            const isUpdatePage = page !== initState.page;
            const isUpdate = isUpdateQuery || isUpdatePage;

            if (query !== initState.query)
                setStatus(Status.pending);

            if (page !== initState.page)
                setStatus(Status.loading);

            if (isUpdate) {
                setTimeout(
                    () => {
                        fetchFromUrl(query, page, perPage)
                            .then(
                                ({ hits, totalHits }) => {
                                    const shortageImage = totalHits - image.length;
                                    const newImage = shortageImage >= perPage ? hits : hits.slice(0, shortageImage);
                                    setImage([...image, ...newImage]);
                                    setTotal(totalHits);
                                    setStatus(Status.resolved);
                                }
                            )
                            .catch(
                                error => {
                                    setError(error);
                                    setStatus(Status.rejected);
                                }
                            );
                    }, time
                );
            }
        },
        [query, page]
    );

    useEffect(
        () => {
            setShowGallery(status === Status.resolved || status === Status.loading);
            setShowButton(status === Status.resolved && image.length < total && total !== 0);
            setShowLoader(status === Status.pending || status === Status.loading);
        },
        [status]
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