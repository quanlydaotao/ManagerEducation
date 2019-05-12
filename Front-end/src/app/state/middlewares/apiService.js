import { fetch } from "../utils";

// const baseUrl = typeof document === "undefined" ? "http://5ca705a29853bd0014973545.mockapi.io/api" : "/api";
const baseUrl = "http://localhost:8080/api";

function handleErrors( err, action, next ) {
    next( {
        type: `${ action.type }_FAILED`,
        payload: err,
        meta: action.meta,
    } );
    return Promise.reject( err );
}

function handleResponse( res, action, next ) {
    next( {
        type: `${ action.type }_COMPLETED`,
        payload: res,
        meta: action.meta,
    } );
    return res;
}

const apiService = ( ) => ( next ) => ( action ) => {
    const result = next( action );
    if ( !action.meta || !action.meta.async ) {
        return result;
    }
    const { path, method = "GET", body, header } = action.meta;

    if ( !path ) {
        throw new Error( `'path' not specified for async action ${ action.type }` );
    }

    const url = `${ baseUrl }${ path }`;
    return fetch( url, method, body, header ).then(
        res => handleResponse( res, action, next ),
        err => handleErrors( err, action, next ),
    );
};

export default apiService;