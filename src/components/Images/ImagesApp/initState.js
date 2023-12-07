import STATUS from "./Status";

const initState = {
    query: null,
    image: [],
    total: 0,
    page: 1,
    perPage: 100,
    selectImage: null,
    status: STATUS.IDLE,
    showResetButton: false,
    showGallery: false,
    showLoadButton: false,
    showLoader: false,
    showModal: false,
    error: null,
};

export default initState;