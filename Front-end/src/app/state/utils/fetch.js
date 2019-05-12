import isomorphicFetch from "isomorphic-fetch";

export default (url, method, body, header ) => {
    const options = {
        method,
        headers: header ? header : requestHeaders(),
        body: method !== "GET" ? body : null,
    }
    return isomorphicFetch(url, options)
        .then(res => parseStatus(res.status, res.json()));
}


function requestHeaders() {
    let user = localStorage.getItem('user');
    if (user) {
        return { 
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + user
        };
    } else {
        return {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
    }
}

function parseStatus(status, res) {
    return new Promise((resolve, reject) => {
        if (status >= 200 && status < 300) {
            res.then(response => resolve(response));
        } else if(status === 403 || status === 401) {
            localStorage.removeItem('user');
            res.then(response => reject({
                status,
                response
            }));
        } else {
            res.then(response => reject({
                status,
                response
            }));
        }
    });
}