import * as types from "./types";

export const getAllUserAccount = () => ( {
    type: types.GET_ALL_USER_ACCOUNT,
    meta: {
        async: true,
        blocking: true,
        path: "/users",
        method: "GET"
    }
} );

export const addNewUserAccount = (dataForm) => ( {
    type: types.ADD_NEW_USER_ACCOUNT,
    meta: {
        async: true,
        blocking: true,
        path: "/register",
        method: "POST",
        body: dataForm
    }
});

export const updateUserAccount = ( ) => ( {
    
});

export const deleteUserAccount = ( ) => ( {
    
});

 
