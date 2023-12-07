import ACTION from "./Action";
import STATUS from "./Status";
import initState from "./initState";

const reducer = (state, { type, value }) => {
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
                    showResetButton: true,
                    showLoader: true,
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
                showGallery: true,
                showLoadButton: isNewImage,
                showLoader: initState.showLoader,
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
                    showLoader: true,
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
                showModal: true,
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
                showModal: initState.showModal,
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
                showLoader: initState.showLoader,
                error: value,
            });
        }

        default:
            return;
    }
};

export default reducer;