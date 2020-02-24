import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ
} from "../types";
import axios from "axios";

// LOGIN USER ACTION
export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/login", userData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());

      dispatch({ type: CLEAR_ERRORS });

      history.push("/");
    })
    .catch(err => {
      console.error(err.response);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

// SIGNUP USER ACTION
export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/signup", newUserData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());

      dispatch({ type: CLEAR_ERRORS });

      history.push("/");
    })
    .catch(err => {
      console.error(err.response);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

// LOGOUT USER ACTION
export const logoutUser = () => dispatch => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];

  dispatch({ type: SET_UNAUTHENTICATED });
};

// GET USER DATA ACTION
export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      console.log(err.response);
    });
};

// UPLOAD USER IMAGE
export const uploadImage = formData => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

// UPDATE USER DETAILS
export const editUserDetails = userDetails => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

// NOTIFICATIONS
export const markNotificationsRead = notificationsIds => dispatch => {
  axios
    .post("/notifications", notificationsIds)
    .then(() => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ
      });
    })
    .catch(err => console.log(err.response));
};

// HELPER FUNCTIONS
const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
