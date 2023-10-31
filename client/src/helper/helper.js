import axios from "axios";
import jwtDecode from "jwt-decode";

// Make api requests
const axiosConfig = axios.create({
  // baseURL: "https://diet-tracker-server.vercel.app",
  baseURL: "http://localhost:8080",
  timeout: 5000,
});

// axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
// axios.defaults.baseURL = "http://localhost:8080";

// To get username from Token
export async function getUsername() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject(" Cannot find the token ");

  const data = jwtDecode(token);
  return data;
}

// authenticate function
export async function authenticate(username) {
  try {
    return await axiosConfig.post(
      "/api/authenticate",
      { username },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    return { error: error + " Username doesn't exist" };
  }
}

// get User details
export async function getUser({ username }) {
  // console.log(username);
  try {
    const { data } = await axiosConfig.get(`api/user/${username}`);
    return data;
  } catch (error) {
    return { error: "Incorrect Password !!!" };
  }
}

// register the user
export async function registerUser(credentials) {
  try {
    console.log(axiosConfig.defaults.baseURL);
    const {
      data: { msg },
      status,
    } = await axiosConfig
      .post(`/api/register`, credentials, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((d) => {
        console.log(d);
      })
      .catch((err) => {
        console.log(err);
      });
    let { username, email } = credentials;

    // send email
    if (status === 201) {
      await axiosConfig.post(
        "/api/registerMail",
        {
          username,
          userEmail: email,
          text: msg,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

//login function
export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await axiosConfig.post(
        `/api/login`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Incorrect password ..." });
  }
}

//update user function
export async function updateUser(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await axiosConfig.put("/api/updateUser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't update Profile" });
  }
}

// generate OTP
export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axiosConfig.get(`/api/generateOTP?username=${username}`);

    // send mail with OTP
    if (status === 201) {
      let data = await getUser({ username });

      let text = `Your Password Recovery OTP is ${code}. Verify and reset password`;

      await axiosConfig.post(
        "/api/registerMail",
        {
          username,
          userEmail: data.email,
          text,
          subject: "Password recovery OTP",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({
      error: " Invalid username (generateOTP helper function)",
    });
  }
}

// verify OTP
export async function verifyOTP({ username, code }) {
  try {
    const { data, status } = await axiosConfig.get(
      "/api/verifyOTP",
      {
        params: { username, code },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return { data, status };
  } catch (error) {
    return Promise.reject({ error });
  }
}

// reset Password
export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axiosConfig.put(
      "/api/resetPassword",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}
