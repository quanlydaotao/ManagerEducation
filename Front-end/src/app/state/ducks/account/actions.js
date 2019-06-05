import * as types from "./types";

export const doGetAllAccounts = () => ( {
    type: types.GET_ALL_USER_ACCOUNT,
    meta: {
        async: true,
        blocking: true,
        path: "/users",
        method: "GET"
    }
} );

export const doGetAccountById = ( id ) => ( {
    type: types.GET_USER_ACCOUNT_BY_ID,
    meta: {
        async: true,
        blocking: true,
        path: `/users/${id}`,
        method: "GET"
    }
} );

export const doCreateNewAccount = ( dataForm ) => ( {
    type: types.CREATE_NEW_USER_ACCOUNT,
    meta: {
        async: true,
        blocking: true,
        path: "/users",
        method: "POST",
        body: JSON.stringify(dataForm)
    }
});

export const doUpdateAccount = ( dataForm ) => ( {
    type: types.UPDATE_USER_ACCOUNT,
    meta: {
        async: true,
        blocking: true,
        path: "/users",
        method: "PUT",
        body: JSON.stringify(dataForm)
    }
});

export const doDeleteAccountByIds = ( ids ) => ( {
    type: types.DELETE_USER_ACCOUNT,
    meta: {
        async: true,
        blocking: true,
        path: "/users",
        method: "DELETE",
        body: JSON.stringify(ids)
    }
});

 
