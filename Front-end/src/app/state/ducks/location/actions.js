import * as types from "./types";

export const doGetAllProvince = () => ({
    type: types.GET_PROVINCE,
    meta: {
        async: true,
        blocking: true,
        path: "/location/provinces",
        method: "GET"
    }
});

export const doGetDistrictsByProvinceId = (id) => ({
    type: types.GET_DISTRICT,
    meta: {
        async: true,
        blocking: true,
        path: "/location/districts/pro/" + id,
        method: "GET"
    }
});

export const doGetWardByDistrictId = (id) => ({
    type: types.GET_WARD,
    meta: {
        async: true,
        blocking: true,
        path: "/location/wards/str/" + id,
        method: "GET"
    }
});