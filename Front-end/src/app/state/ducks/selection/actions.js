import * as types from "./types";

export const setDataYearSelection = ( data ) => ( {
    type: types.SET_DATA_SELECT_YEAR,
    payload: data
});

export const setDataCourseSelection = ( data ) => ( {
    type: types.SET_DATA_SELECT_COURSE,
    payload: data
});