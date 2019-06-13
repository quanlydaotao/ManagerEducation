import { combineReducers } from "redux";
import * as types from "./types";
import { createReducer } from "../../utils";

const initialState = []

const applyProvinceReducer = createReducer(initialState)({
    [types.GET_PROVINCE_COMPLETED]: (state, action) => action.payload,
});

const applyDistrictReducer = createReducer(initialState)({
    [types.GET_DISTRICT_COMPLETED]: (state, action) => action.payload,
});

const applyWardReducer = createReducer(initialState)({
    [types.GET_WARD_COMPLETED]: (state, action) => action.payload,
});


export default combineReducers({
    provinces: applyProvinceReducer,
    districts: applyDistrictReducer,
    wards: applyWardReducer
});