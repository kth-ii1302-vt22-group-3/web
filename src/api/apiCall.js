import TEMPER_URL from "./env";

function doThrow(e) {
  throw e;
}
const ApiCall = {
  apiCall(params) {
    return fetch(TEMPER_URL, {
      method: "GET", // HTTP method
      headers: {
        // HTTP headers
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        //"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
      },
    })
      .then((response) =>
        response.status === 200
          ? response
          : doThrow(
              new Error(
                "Status was: " + response.statusText + " " + response.status
              )
            )
      )
      .then((response) => response.json());
  },
  getTemperature(params) {
    return ApiCall.apiCall("" + new URLSearchParams(params)).then(
      (data) => data
    );
  },
};

export default ApiCall;
