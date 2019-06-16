import * as types from "./types";

export const doGetAllCourseByYearId = (id) => ( {
    type: types.GET_ALL_COURSE_BY_ID_YEAR,
    meta: {
        async: true,
        blocking: true,
        path: `/course?year=${id}&filter=false`,
        method: "GET"
    }
} );

export const doGetAllCourseByMaxClasses = (id) => ( {
    type: types.GET_ALL_COURSE_BY_MAX_CLASSES,
    meta: {
        async: true,
        blocking: true,
        path: `/course?year=${id}&filter=true`,
        method: "GET"
    }
} );

export const doSelectCourse = ( id ) => ( {
    type: types.SELECT_COURSE,
    payload: id
} );

// export const addNewUserAccount = ( dataForm ) => ( {
//     type: types.ADD_NEW_USER_ACCOUNT,
//     meta: {
//         async: true,
//         blocking: true,
//         path: "/users",
//         method: "POST",
//         body: JSON.stringify(dataForm)
//     }
// });

// export const openFormEdit = ( ) => ( {
//     type: types.OPEN_EDIT_USER_ACCOUNT,
// });

// export const closeFormEdit = ( ) => ( {
//     type: types.CLOSE_EDIT_USER_ACCOUNT,
// });


// export const updateUserAccount = ( dataForm ) => ( {
//     type: types.UPDATE_USER_ACCOUNT,
//     meta: {
//         async: true,
//         blocking: true,
//         path: "/users",
//         method: "PUT",
//         body: JSON.stringify(dataForm)
//     }
// });

// export const deleteUserAccount = ( listId ) => ( {
//     type: types.DELETE_USER_ACCOUNT,
//     meta: {
//         async: true,
//         blocking: true,
//         path: "/users",
//         method: "DELETE",
//         body: JSON.stringify(listId)
//     }
// });

 
