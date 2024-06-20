import { BadCredentialsError, ServerError, UnknownError, UnauthorizedServerAccessError, CriticalError } from "./apiErrors";

// Pour les types voir : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#description
const apiInfo = Object.freeze({
  baseUrl: "http://localhost:3001/api/v1",
  endpoints: {
    user: {
      login: {
        url: "/user/login",
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: {
          type: "json",
          model: {
            email: "string",
            password: "string"
          }
        },
        onResponse: async (response) => {
          let error;
          if(response.status == 400) error = new BadCredentialsError();
          if(! error) error = handleRegularErrors(response);
          if(error) return { error };
          const data = await response.json();
          return { data: { token: data?.body.token }};
        }
      },
      profile: {
        get: {
          url: "/user/profile",
          method: "post",
          protected: true,
          headers: {
            "Accept": "application/json"
          },
          onResponse: async (response) => {
            let error;
            if(response.status == 401) error = new UnauthorizedServerAccessError();
            if(! error) error = handleRegularErrors(response);
            if(error) return { error };
            const data = await response.json();
            return { data: { userInfo: data.body }};
          }
        },
        update: {
          url: "/user/profile",
          method: "put",
          protected: true,
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: {
            type: "json",
            model: {
              userName: "string"
            }
          },
          onResponse: async (response) => {
            let error;
            if(response.status == 401) error = new UnauthorizedServerAccessError();
            if(! error) error = handleRegularErrors(response);
            if(error) return { error };
            const data = await response.json();
            const userName = data.body.userName;
            return { data: { userName }};
          }
        },
      },
    },
  },
});

function handleRegularErrors(response) {
  let error;
  if(response.status >= 500) error = new ServerError();
  if((! error) && (response.status != 200)) error = new UnknownError(`Server responded with an unexpected status code. Server response : ${response}`);
  return error;
}

export { apiInfo };

