import ACTION from "./Action";
import STATUS from "./Status";
import { initState, initShow } from "./initState";

export const stateReducer = (state, { type, value }) => {
    const {
        query,
        image,
        total,
        page,
    } = state;

    switch (type) {
        case ACTION.INPUT: {
            const isUpdateQuery = query !== value;
            if (isUpdateQuery) {
                return ({
                    ...initState,
                    query: value,
                    status: STATUS.PENDING,
                });
            }
            else {
                return ({
                    ...state
                });
            }
        }

        case ACTION.RESET: {
            return ({ ...initState });
        }

        case ACTION.RESPONSE: {
            const { newImage, newTotal } = value;
            return ({
                ...state,
                image: [...image, ...newImage],
                total: newTotal,
                status: STATUS.RESOLVED,
            });
        }

        case ACTION.LOAD: {
            if (image.length < total) {
                return ({
                    ...state,
                    page: page + 1,
                    status: STATUS.LOADING,
                });
            }
            else {
                return ({
                    ...state,
                });
            }
        }

        case ACTION.ERROR: {
            return ({
                ...state,
                status: STATUS.REJECTED,
                error: value,
            });
        }

        default:
            break;
    }
};

export const showReducer = (show, { type }) => {
    switch (type) {
        case STATUS.IDLE: {
            return ({
                ...initShow,
            });
        }

        case STATUS.PENDING: {
            return ({
                ...initShow,
                showResetButton: true,
                showLoader: true,
            });
        }

        case STATUS.RESOLVED: {
            return ({
                ...show,
                showResetButton: true,
                showLoadButton: true,
                showGallery: true,
                showLoader: false,
                showModal: false,
            });
        }

        case STATUS.LOADING: {
            return ({
                ...show,
                showLoader: true,
            });
        }

        case STATUS.REJECTED: {
            return ({
                ...initShow,
                showResetButton: true,
                showLoader: false,
            });
        }

        default:
            break;
    }
};