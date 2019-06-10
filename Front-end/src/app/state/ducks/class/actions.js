import * as types from "./types";

export const doGetClassesByCourseId = (id) => ( {
    type: types.GET_ALL_CLASS_BY_ID_COURSE,
    meta: {
        async: true,
        blocking: true,
        path: `/class?course=${id}`,
        method: "GET"
    }
} );

export const doGetClassById = ( id ) => ( {
    type: types.GET_CLASS_BY_ID,
    meta: {
        async: true,
        blocking: true,
        path: `/class/${id}`,
        method: "GET"
    }
} );

export const doCreateNewClass = ( dataForm ) => ( {
    type: types.ADD_NEW_CLASS,
    meta: {
        async: true,
        blocking: true,
        path: "/class",
        method: "POST",
        body: JSON.stringify(dataForm)
    }
});

export const doUpdateClass = ( dataForm ) => ( {
    type: types.UPDATE_CLASS,
    meta: {
        async: true,
        blocking: true,
        path: "/class",
        method: "PUT",
        body: JSON.stringify(dataForm)
    }
});

// export const deleteYears = ( listId ) => ( {
//     type: types.DELETE_YEARS,
//     meta: {
//         async: true,
//         blocking: true,
//         path: "/years",
//         method: "DELETE",
//         body: JSON.stringify(listId)
//     }
// });
