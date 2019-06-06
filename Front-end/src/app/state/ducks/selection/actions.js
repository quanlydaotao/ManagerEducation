import * as types from "./types";

export const doSetDataYearSelection = ( data ) => ( {
    type: types.SET_DATA_SELECT_YEAR,
    payload: data
});

export const doSetDataCourseSelection = ( data ) => ( {
    type: types.SET_DATA_SELECT_COURSE,
    payload: data
});