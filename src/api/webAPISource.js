function doThrow(e){ throw e; }
const Source={   // JS object creation literal
    apiCall(params) {
        return fetch(BASE_URL+params, {
            "method": "GET",              // HTTP method
            "headers": { 
                "contentType": "application/json"                 // HTTP headers
            }
        })
            .then(response=> response.status === 200 ? response :
                doThrow(new Error("Status was: " + response.statusText + " " + response.status)))
            .then(response => response.json());
    }
    ,
    searchPicture(params) {
        return Source.apiCall("" + new URLSearchParams(params)).then(data=> console.log(data), data.results );
    }
};

