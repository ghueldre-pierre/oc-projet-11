import { BadCredentialsError, ServerError, UnknownError, UnauthorizedServerAccessError } from "./apiErrors";

// Pour les types voir : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#description
const apiInfo = Object.freeze({
  baseUrl: "http://localhost:3001/api/v1",
  endpoints: {
    user: {
      login: {
        url: "/user/login",
        method: "post",
        body: {
          type: "json",
          model: {
            email: "string",
            password: "string"
          }
        },
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        onResponse: async (response) => {
          let error = null;
          if(response.status == 400) error = new BadCredentialsError();
          if(! error) error = handleRegularErrors(response);
          if(error) return { error };
          const data = await response.json();
          console.log("DATA received : ", data);
          const token = data.body.token;
          return { data: { token }};
        }
      },
      profile: {
        get: {
          url: "/user/profile",
          method: "post",
          protected: true,
          onResponse: async (response) => {
            let error = null;
            if(response.status == 401) error = new UnauthorizedServerAccessError();
            if(! error) error = handleRegularErrors(response);
            if(error) return { error };
            const data = await response.json();
            console.log("DATA received : ", data);
            const userInfo = data.body;
            return { data: { userInfo }};
          }
        },
        update: {
          url: "/user/profile",
          method: "put",
          protected: true,
        },
      },
    },
  },
});

function handleRegularErrors(response) {
  let error = null;
  console.log("response", response);
  if(response.status >= 500) error = new ServerError();
  if((! error) && (response.status != 200)) error = new UnknownError(`Server responded with an unexpected status code. Server response : ${response}`);
  return error;
}

export { apiInfo };

