import isomorphicFetch from "isomorphic-fetch";

export default (url, method, body) => {
    const options = {
        method,
        headers: requestHeaders(),
        body: method !== "GET" ? JSON.stringify(body) : null,
    }
    return isomorphicFetch(url, options)
        .then(res => parseStatus(res.status, res.json()));
}


function requestHeaders() {
    let user = sessionStorage.getItem('user');
    if (user) {
        return { 
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + user
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
        } else {
            sessionStorage.removeItem('user');
            res.then(response => reject({
                status,
                response
            }));
        }
    });
}