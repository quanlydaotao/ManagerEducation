import * as types from "./types";

export const setRows = ( rows ) => ( {
    type: types.SET_ROWS,
    payload: rows
} );

