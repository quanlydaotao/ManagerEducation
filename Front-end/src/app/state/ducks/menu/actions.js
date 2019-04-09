import * as types from './types';

export const fetchListMenu = () => ({
    type: types.FETCH_LIST_MENU,
    meta: {
        async: true,
        blocking: true,
        path: "/menu",
        method: "GET",
    },
});