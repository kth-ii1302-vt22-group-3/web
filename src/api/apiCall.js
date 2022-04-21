import TEMPER_URL from "./env";

function doThrow(e){throw e; }
const ApiCall = {
    apiCall(params){
        return fetch(TEMPER_URL , {
            "method": "GET",              // HTTP method
            "headers": {                  // HTTP headers
            }
        })
            .then(response=> response.status === 200 ? response :
                doThrow(new Error("Status was: " + response.statusText + " " + response.status)))
            .then(response => response.json());
    }
    ,
    getTemperature(params){
        return ApiCall.apiCall("" + new URLSearchParams(params))
    }
};

export default ApiCall