import * as types from "./types";

export const doSetDataSelection = ( data ) => ( {
    type: types.SET_DATA_SELECT,
    payload: data
});
