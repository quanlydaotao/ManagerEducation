import * as types from "./types";

export const doUploadFile = ( file ) => ({
    type: types.UPLOAD_FILE,
    meta: {
        async: true,
        blocking: true,
        path: "/file/upload",
        method: "POST",
        body: file,
        header: {
            "Authorization": "Bearer " + localStorage.getItem('user')
        }
    }
});

export const doGetFile = ( dir , nameFile) => ({
    type: types.GET_FILE,
    meta: {
        async: true,
        blocking: true,
        path: `/file/${dir}/${nameFile}`,
        method: "GET",
        payload: null,
        header: {
            "Authorization": "Bearer " + localStorage.getItem('user')
        }
    }
});

export const doUpdateFile = ( file ) => ({
    type: types.UPDATE_FILE,
    meta: {
        async: true,
        blocking: true,
        path: "/file/update",
        method: "PUT",
        body: file,
        header: {
            "Authorization": "Bearer " + localStorage.getItem('user')
        }
    }
});