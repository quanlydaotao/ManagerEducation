import * as types from "./types";

export const getAllYears = () => ( {
    type: types.GET_ALL_YEARS,
    meta: {
        async: true,
        blocking: true,
        path: "/years",
        method: "GET"
    }
} )

export const addNewYear = ( dataForm ) => ( {
    type: types.ADD_NEW_YEARS,
    meta: {
        async: true,
        blocking: true,
        path: "/years",
        method: "POST",
        body: JSON.stringify(dataForm)
    }
});