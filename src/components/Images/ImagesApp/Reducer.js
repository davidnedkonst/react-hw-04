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
            console.log(`Action: ${ACTION.INPUT}.`);
            if (isUpdateQuery) {
                console.log(
                    `Reducer run. 
                    \nSet query: ${value}. 
                    \nSet status: ${STATUS.PENDING}
                    \nSet showReset: true.
                    \nSet showLoader: true.`
                );
                return ({
                    ...initState,
                    query: value,
                    status: STATUS.PENDING,
                });
            }
            else {
                console.log("Reducer run. Can't set query.");
                return ({ ...state });
            }
        }

        case ACTION.RESET: {
            console.log(`Action: ${ACTION.RESET}.`);
            return ({ ...initState });
        }

        case ACTION.RESPONSE: {
            console.log(`Action: ${ACTION.RESPONSE}.`);
            console.log(
                `Reducer run.
                    \nSet image. 
                    \nSet status: ${STATUS.RESOLVED}
                    \nSet showGallery: true.
                    \nSet showLoadButton: isNewImage.`
            );

            const { newImage, newTotal } = value;
            const isNewImage = image.length + newImage.length < newTotal;
            console.log("image.length = " + image.length);
            console.log("newImage.length = " + newImage.length);
            console.log("isNewImage: " + isNewImage);
            console.log("Reset showLoader.");

            return ({
                ...state,
                image: [...image, ...newImage],
                total: newTotal,
                status: STATUS.RESOLVED,
            });
        }

        case ACTION.LOAD: {
            console.log(`Action: ${ACTION.LOAD}.`);

            if (image.length < total) {
                console.log(
                    `Reducer run.
                    \nIncrement page.
                    \nSet status: ${STATUS.LOADING}.
                    \nSet showLoader: true.`
                );

                return ({
                    ...state,
                    page: page + 1,
                    status: STATUS.LOADING,
                });
            }

            else {
                console.log("Reducer run. All images are loaded.");
                return ({
                    ...state,
                });
            }
        }

        case ACTION.SELECT: {
            console.log(`Action: ${ACTION.SELECT}.`);
            console.log(
                `Reducer run.
                    \nSet selectImage.
                    \nSet showModal: true.`
            );

            return ({
                ...state,
                selectImage: value,
                status: STATUS.MODAL,
            });
        }

        case ACTION.CLOSE: {
            console.log(`Action: ${ACTION.CLOSE}.`);
            console.log(
                `Reducer run.
                    \nReset selectImage.
                    \nReset showModal.`
            );

            return ({
                ...state,
                selectImage: initState.selectImage,
                status: STATUS.RESOLVED,
            });
        }

        case ACTION.ERROR: {
            console.log(`Action: ${ACTION.ERROR}.`);
            console.log(
                `Reducer run.
                    \nSet status ${STATUS.REJECTED}.
                    \nReset showLoder.
                    \nSet error.`
            );

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
                ...initShow,
                showResetButton: true,
                showLoadButton: true,
                showLoader: false,
                showGallery: true,
            });
        }
            
        case STATUS.LOADING: {
            return ({
                showLoader: true,
            });
        }
            
        case STATUS.MODAL: {
            return ({
                showModal: true,
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