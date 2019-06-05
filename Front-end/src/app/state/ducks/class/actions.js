import * as types from "./types";

export const getAllClassByCourseId = (id) => ( {
    type: types.GET_ALL_CLASS_BY_ID_COURSE,
    meta: {
        async: true,
        blocking: true,
        path: `/class/course/${id}`,
        method: "GET"
    }
} );

export const getClassById = ( id ) => ( {
    type: types.GET_CLASS_BY_ID,
    meta: {
        async: true,
        blocking: true,
        path: `/class/${id}`,
        method: "GET"
    }
} );

// export const addNewYear = ( dataForm ) => ( {
//     type: types.ADD_NEW_YEARS,
//     meta: {
//         async: true,
//         blocking: true,
//         path: "/years",
//         method: "POST",
//         body: JSON.stringify(dataForm)
//     }
// });

// export const updateYear = ( dataForm ) => ( {
//     type: types.UPDATE_YEARS,
//     meta: {
//         async: true,
//         blocking: true,
//         path: "/years",
//         method: "PUT",
//         body: JSON.stringify(dataForm)
//     }
// });

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

export const openFormEdit = ( ) => ( {
    type: types.OPEN_EDIT_CLASS,
});

export const closeFormEdit = ( ) => ( {
    type: types.CLOSE_EDIT_CLASS,
});