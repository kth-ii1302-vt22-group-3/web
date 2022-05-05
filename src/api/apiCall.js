import TEMPER_URL from "./env";

function doThrow(e) {
  throw e;
}
const ApiCall = {
  apiCall(params) {
    return fetch(TEMPER_URL + params, {
      method: "GET", // HTTP method
      crossDomain: true,
      headers: {
        // HTTP headers
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
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
  getTemperature() {
    return ApiCall.apiCall("/current").then(
      (data) => data
    );
  },
  getTemperatures() {
    return ApiCall.apiCall("/")
      .then((data) => {
        return data;
      });
  }
};

export default ApiCall;
