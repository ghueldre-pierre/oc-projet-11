import {
  ServerError,
  UnknownError,
  MissingDataError,
  CriticalError,
  MissingTokenError,
} from "./apiErrors";
import { apiInfo } from "./apiInfo"; /// TODO : try to remove this import !
import { getToken } from "../features/auth/authSlice";

async function doFetch(endpoint, data = null) {
  try {
    let request = {};
    // create request body if data is present
    if (Boolean(data)) {
      console.log("has data", data);
      const { dataFormat, dataModel } = getEndpointDataModel(endpoint);
      const dataValidationResult = checkAllRequiredDataPresent(data, dataModel);
      if (dataValidationResult.error) {
        throw MissingDataError(dataValidationResult.error);
      }
      if (dataFormat === "json") {
        data = removeNonRequiredProperties(data, dataModel);
        request.body = JSON.stringify(data);
      } else {
        request.body = data;
      }
    }
    const { url, method, headers, isProtected } = getEndpointInfo(endpoint);

    // create request method
    request.method = method;

    // create request headers
    request.headers = Boolean(headers) ? headers : {};

    if (isProtected) {
      console.log("isProtected");
      const token = getToken();
      if (!token)
        throw new MissingTokenError(
          "Tried to fetch a protected endpoint without access token"
        );
      console.log(request);
      request.headers["Authorization"] = `Bearer ${token}`;
      console.log(request);
    }
    // debug
    console.info("Fetch request : ", request);

    const serverResponse = await fetch(url, request);
    const response = await endpoint.onResponse(serverResponse);
    if (response.error) throw response.error;
    if (!response.data)
      throw new CriticalError(
        `No data were received from this endpoint : ${endpoint}`
      );
    return response.data;
  } catch (error) {
    if (error instanceof TypeError) {
      // most probably : failed to fetch (server is down)
      throw new ServerError();
    }
    if (!error?.handled) {
      throw new UnknownError(error);
    }
    // rethrow handled errors
    throw error;
  }
}

/*
      Note : THIS FUNCTION DOES NOT CARE IF THERE ARE MORE KEYS THAN THE REQUIRED ONES : as 
      long has the required keys are present and their types correspond IT WILL RETURN TRUE.
  */
function checkAllRequiredDataPresent(providedData, dataModel) {
  let errorMessage = "";

  if (providedData) {
    if (typeof providedData !== "object")
      throw CriticalError(
        `This function only supports object for now. Cancelling operation. Provided data : ${providedData}`
      );
    if (typeof dataModel !== "object")
      throw CriticalError(
        `This function only supports object for now. Cancelling operation. Data Model : ${dataModel}`
      );

    const requiredDataKeys = Object.keys(dataModel);
    const providedDataKeys = Object.keys(providedData);

    for (const requiredKey of requiredDataKeys) {
      if (providedDataKeys.includes(requiredKey)) {
        const requiredDataType = dataModel[requiredKey];
        const providedDataType = typeof providedData[requiredKey];
        if (providedDataType === requiredDataType) {
          continue;
        } else {
          errorMessage = `The type of the required key (${requiredKey}) does not correspond to the required type : type was ${providedDataType} instead of ${requiredDataType}`;
          break;
        }
      } else {
        errorMessage = `The required key (${requiredKey}) was not found !`;
        break;
      }
    }
  } else {
    errorMessage = `No data were provided !`;
  }

  return Boolean(errorMessage) ? { error: errorMessage } : true;
}

function removeNonRequiredProperties(providedData, dataModel) {
  const dataOutput = structuredClone(providedData);
  const requiredDataKeys = Object.keys(dataModel);
  const providedDataKeys = Object.keys(providedData);
  for (const providedKey of providedDataKeys) {
    if (requiredDataKeys.includes(providedKey)) continue;
    delete dataOutput[providedKey];
  }
  return dataOutput;
}

/// TODO : find a way to remove apiInfo "binding"
function getEndpointInfo(endpoint) {
  return {
    url: apiInfo.baseUrl + endpoint.url,
    method: endpoint.method,
    headers: endpoint.headers,
    isProtected: endpoint.hasOwnProperty("protected")
      ? endpoint.protected
      : false,
  };
}

function getEndpointDataModel(endpoint) {
  return {
    dataFormat: endpoint.body.type,
    dataModel: endpoint.body.model,
  };
}

export { doFetch };

/*
  DOC :

  When a fetch request comes back with an error code from the server, the catch of the promise is not executed, the then is. The catch is only executed if there is a network failure. See the fetch docs:

  The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. Instead, it will resolve normally (with ok status set to false), and it will only reject on network failure or if anything prevented the request from completing.

  What you need to do is, inside your then, check response.ok. If response.ok == false, then the request returned an error. You can find info about this error in response.status and response.statusText.
*/
