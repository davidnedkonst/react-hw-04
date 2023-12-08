import STATUS from "./Status";

 export const initState = {
    query: null,
    image: [],
    total: 0,
    page: 1,
    perPage: 100,
    status: STATUS.IDLE,
    error: null,
};

export const initShow = {
    showResetButton: false,
    showLoadButton: false,
    showLoader: false,
    showGallery: false,
};