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

    case "UPDATE_USER":
      return {
        user: action.payload.user,
        token: state.token,
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
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Fetch user data only once when the component mounts
    const fetchUserData = async () => {
      try {
        if (state.token) {
          const UserURL = "http://localhost:8000/v1/user/currentUser";
          const response = await axios.get(UserURL, {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          });
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user: response.data.data, token: state.token },
          });
        } else {
          dispatch({ type: "LOGOUT" });
        }
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        dispatch({ type: "LOGOUT" });
        setIsInitialized(true);
      }
    };

    if (!isInitialized) {
      fetchUserData();
    }
  }, [state.token, isInitialized]);

  useEffect(() => {
    // Update localStorage only when user or token changes
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
    localStorage.setItem("token", state.token);
  }, [state.user, state.token]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isLoggedIn: state.token !== null,
        dispatch,
      }}
    >
      {isInitialized && children}
    </authContext.Provider>
  );
};
