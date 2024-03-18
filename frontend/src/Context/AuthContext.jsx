import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import axios from "axios";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
};

export const authContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        token: null,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token,
      };

    case "LOGOUT":
      return {
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("fetching user data");
    const fetchUserData = async () => {
      try {
        const UserURL = "http://localhost:8000/v1/user/currentUser";
        const response = await axios.get(UserURL, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: response.data.data, token: state.token }, // This line needs to be updated
        });
        setIsLoggedIn(true);
        localStorage.setItem("token", state.token); // Update token in local storage
        console.log("RESPONSE DATA : ", response.data.data);
      } catch (error) {
        // Handle error, e.g., token expired, unauthorized, etc.
        console.error("Failed to fetch user data:", error);
        dispatch({ type: "LOGOUT" });
        setIsLoggedIn(false);
      }
    };

    if (state.token) {
      fetchUserData();
    } else {
      setIsLoggedIn(false);
    }
  }, [state.token]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isLoggedIn,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
