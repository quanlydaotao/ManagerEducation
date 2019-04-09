import * as types from './types';

export const fetchListBanner = () => ({
    type: types.FETCH_LIST_BANNER,
    meta: {
        async: true,
        blocking: true,
        path: "/banner",
        method: "GET",
    },
});