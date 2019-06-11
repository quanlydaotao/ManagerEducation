import * as types from "./types";

export const doGetAllYears = ( status ) => ( {
    type: types.GET_ALL_YEARS,
    meta: {
        async: true,
        blocking: true,
        path: `/years?status=${status ? true : false}`,
        method: "GET"
    }
} );

export const doGetYearById = ( id ) => ( {
    type: types.GET_YEARS_BY_ID,
    meta: {
        async: true,
        blocking: true,
        path: `/years/${id}`,
        method: "GET"
    }
} );

export const doCreateNewYear = ( dataForm ) => ( {
    type: types.ADD_NEW_YEARS,
    meta: {
        async: true,
        blocking: true,
        path: "/years",
        method: "POST",
        body: JSON.stringify(dataForm)
    }
});

export const doUpdateYear = ( dataForm ) => ( {
    type: types.UPDATE_YEARS,
    meta: {
        async: true,
        blocking: true,
        path: "/years",
        method: "PUT",
        body: JSON.stringify(dataForm)
    }
});

export const doDeleteYearByIds = ( ids ) => ( {
    type: types.DELETE_YEARS,
    meta: {
        async: true,
        blocking: true,
        path: "/years",
        method: "DELETE",
        body: JSON.stringify(ids)
    }
});

