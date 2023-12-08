import axios from "axios";
import KEY from "./key.json";

function searchUrl(
    query,
    page = 1,
    perPage = 12,
    key = KEY.key,
    type = "photo",
    orientation = "horizontal1"
) {
    const strApi = "https://pixabay.com/api/";
    const strKey = `?key=${key}`;
    const strQuery = `&q=${query}`;
    const strPage = `&page=${page}`;
    const strType = `&image_type=${type}`;
    const strOrientation = `&orientation=${orientation}`;
    const strPerPage = `&per_page=${perPage}`;

    return strApi + strKey + strQuery + strPage + strType + strOrientation + strPerPage;
};

export default function fetchFromUrl(query, page, perPage) {
    const url = searchUrl(query, page, perPage);
    const errorMsg = `Name ${query} not found`;
    const response = axios
        .get(url)
        .then(({ data }) => data)
        .catch(
            error => {
                console.log(errorMsg);
            }
        );
    return response;

    //
    // return fetch(url)
    //     .then(
    //         response => {
    //             if (response.ok) return response.json();
    //             if (!response.ok) return Promise.reject(new Error(errorMsg));
    //         }
    //     );
};

