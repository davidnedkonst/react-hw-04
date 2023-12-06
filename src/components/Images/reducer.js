import ACTION from "./Action";
import STATUS from "./Status";
import initState from "./initState";

const reducer = (state, { type, value }) => {
    const {
        query,
        image,
        total,
        page,
        // perPage,
        // selectImage,
        // status,
        // showModal,
        // showGallery,
        // showButton,
        // showLoader,
        // error
    } = state;

    switch (type) {
        case ACTION.INPUT: {
            const isUpdateQuery = query !== value;
            console.log(`Action: ${ACTION.INPUT}. Value: ${value}.`);
            if (isUpdateQuery) {
                console.log(
                    `Reducer run. 
                    \nSet query: ${value}. 
                    \nSet status: ${STATUS.PENDING}
                    \nSet showReset: true.`
                );
                return ({
                    ...initState,
                    query: value,
                    status: STATUS.PENDING,
                    showResetButton: true,
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
                    \nSet showLoadButton: true.`
            );

            const { newImage, newTotal } = value;
            return ({
                ...state,
                image: [...state.image, ...newImage],
                total: newTotal,
                status: STATUS.RESOLVED,
                showGallery: true,
                showLoadButton: image.length + newImage.length < total ? true : false,
            });
        }

        case ACTION.LOAD: {
            console.log(`Action: ${ACTION.LOAD}.`);

            // const { newImage, newTotal } = value;
            // const shortageImageCount = newTotal - state.image.length;
            // const newImages = shortageImageCount >= state.perPage ? newImage : image.slice(0, shortageImageCount);
            if (image.length < total) {
                console.log(
                    `Reducer run.
                    Increment page.
                    \nSet status: ${STATUS.LOADING}.
                    \nSet showLoader: true.`
                );

                return ({
                    ...state,
                    image: [...state.image],
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

        // case ACTION.SELECT: {
        //     if (image.total > 0) {
        //         console.log("Reducer. Set selectImage");
        //         return ({ ...state, selectImage: value, });
        //     }
        // } break;

        // case ACTION.CLOSE: {
        //     if (state.status === STATUS.RESOLVED || state.status === STATUS.LOADING) {
        //         return ({ ...state, selectImage: initState.selectImage, showModal: false });
        //     }
        // } break;

        // case ACTION.ERROR: {
        //     if (error) {
        //         console.log("Reducer. Set status rejected");
        //         return ({ ...state, status: STATUS.REJECTED });
        //     }
        // } break;

        default:
            return;
    }
};

export default reducer;