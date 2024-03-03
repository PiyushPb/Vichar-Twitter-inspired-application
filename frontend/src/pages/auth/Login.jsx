import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { backend_url } from "../../config/config";
import { toast } from "react-toastify";
import { authContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import loginBg from "../../assets/loginbg.webp";

const Login = () => {
  const { isLoggedIn, dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    credentials: "",
    password: "",
  });

  const formInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginClicked = async (e) => {
    e.preventDefault();

    if (formData.credentials === "" || formData.password === "") {
      toast.error("Please fill all the fields");
      return;
    }

    const loginURL = backend_url + "/v1/auth/login";

    try {
      const response = await fetch(loginURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credentials: formData.credentials,
          password: formData.password,
        }),
      });

      const result = await response.json();

      console.log(result);

      if (result.success === true) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: result.data,
            token: result.token,
          },
        });
        toast.success("User logged in successfully");
        navigate("/");
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later");
    }
  };

  return isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <div className="w-full h-[100vh] bg-bgLight dark:bg-bgDark font-montserrat">
      <img
        src={loginBg}
        alt="..."
        className="w-[95%] absolute top-0 left-[50%] -translate-x-1/2 md:block hidden"
      />
      <div className="w-full h-[100vh] flex justify-center items-center relative z-10">
        <div className="flex flex-col justify-center items-center gap-5 max-w-[400px] w-[100%] p-[24px] placeholder-fuchsia-100">
          <h2 className="text-3xl font-bold text-textLight dark:text-textDark ">
            Log in to vichar
          </h2>
          <form className="flex flex-col gap-5 w-[100%]">
            <input
              type="text"
              onChange={formInputChange}
              name="credentials"
              placeholder="Username, Email or Phone number"
              className="w-[100%] py-4 px-3 text-[13px] rounded-xl focus:outline outline-1 bg-inputColorLight dark:bg-inputColorDark dark:text-textDark
              focus:outline-primaryLight dark:focus:outline-primaryDark
              "
            />
            <input
              type="password"
              onChange={formInputChange}
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              className="w-[100%] py-4 px-3 text-[13px] rounded-xl focus:outline outline-1 bg-inputColorLight dark:bg-inputColorDark dark:text-textDark
              focus:outline-primaryLight dark:focus:outline-primaryDark"
            />
            <button
              onClick={handleLoginClicked}
              className="w-[100%] py-4 px-3 rounded-xl 
              bg-[#101010] hover:bg-[#202020] transition dark:bg-gradient-to-r dark:from-teal-400 dark:to-blue-300 dark:hover:from-teal-500 dark:hover:to-blue-400 text-textDark dark:text-textLight"
            >
              Login
            </button>
          </form>
          <p className="text-[13px] cursor-pointer text-textLight dark:text-textDark">
            Forgotten password?
          </p>
          <p className="text-[13px] text-textLight dark:text-textDark">
            Don't have an account?{" "}
            <Link to={"/signup"} className="font-bold cursor-pointer">
              Sign up
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
