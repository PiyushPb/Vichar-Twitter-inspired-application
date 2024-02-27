import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import { backend_url } from "../../config/config";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";
import { authContext } from "../../Context/AuthContext";
import loginBg from "../../assets/loginbg.webp";

const Signup = () => {
  const { isLoggedIn } = useContext(authContext);

  const [validcredentials, setValidcredentials] = useState("");
  const [isUsernameAvailable, setisUsernameAvailable] = useState("");
  const [isPasswordStrong, setIsPasswordStrong] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [credentials, setcredentials] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({
    credentials: "",
    name: "",
    username: "",
    password: "",
  });

  // email regex
  const emailPhoneRegex = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^\d{9}$/;

    if (emailRegex.test(credentials) || phoneRegex.test(credentials)) {
      setValidcredentials(true);
    } else {
      setValidcredentials(false);
    }
  };

  // handle email or phone change
  const handlecredentialsChange = (e) => {
    setcredentials(e.target.value);
    emailPhoneRegex();
    setFormData({ ...formData, credentials: e.target.value });
  };

  // handle username change
  const handleUsernameChange = (e) => {
    const input = e.target.value;
    const sanitizedInput = input.replace(/[^a-z0-9._]/g, "").toLowerCase();
    const truncatedInput = sanitizedInput.slice(0, 12);

    setUsername(truncatedInput);
    setFormData({ ...formData, username: truncatedInput });
  };

  useEffect(() => {
    if (username === "") {
      setisUsernameAvailable("");
    } else {
      const usernameCheckTimeout = setTimeout(() => {
        checkUsername();
      }, 500);

      return () => clearTimeout(usernameCheckTimeout);
    }
  }, [username]);

  const handlePasswordChange = (e) => {
    const password = e.target.value;

    setPassword(password);

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;

    if (passwordRegex.test(password)) {
      setIsPasswordStrong(true);
    } else {
      setIsPasswordStrong(false);
    }

    setFormData({ ...formData, password });
  };

  const checkUsername = async () => {
    const checkUsernameURL = backend_url + "/v1/auth/checkusername";

    try {
      const response = await fetch(checkUsernameURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setisUsernameAvailable(data.availability);
        });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log(formData);

    if (
      formData.credentials === "" ||
      formData.password === "" ||
      formData.username === "" ||
      formData.name === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }

    const registerURL = backend_url + "/v1/auth/register";

    try {
      const response = await fetch(registerURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credentials: formData.credentials,
          name: formData.name,
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }

      return;
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    if (credentials === "") {
      setValidcredentials("");
    }

    if (username === "") {
      setisUsernameAvailable("");
    }

    if (password === "") {
      setIsPasswordStrong("");
    }
  }, [credentials, username, password]);

  return isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <div className="w-full h-[100vh] bg-bgLight dark:bg-bgDark">
      <img
        src={loginBg}
        alt="..."
        className="w-[95%] absolute top-0 left-[50%] -translate-x-1/2 md:block hidden"
      />
      <div className="w-full h-[100vh] flex justify-center items-center relative z-10">
        <div className="flex flex-col justify-center items-center gap-5 max-w-[400px] mt-0 md:mt-[150px] w-[100%] p-[24px] placeholder-fuchsia-100">
          <h2 className="text-3xl font-bold text-textLight dark:text-textDark">
            Signup to vichar
          </h2>
          <form className="flex flex-col gap-5 w-[100%]" autoComplete="off">
            <div className="relative">
              <div className="absolute top-[50%] right-[15px] -translate-y-1/2 text-[20px]">
                {validcredentials === true ? (
                  <CiCircleCheck className="text-[30px] text-green-500 cursor-pointer" />
                ) : validcredentials === false ? (
                  <div className="relative">
                    <CiCircleRemove className="text-[30px] text-red-500" />
                  </div>
                ) : null}
              </div>
              <input
                type="text"
                placeholder="Email or Phone number"
                className={`w-[100%] py-4 px-3 text-[13px] rounded-xl focus:outline outline-1 bg-inputColorLight dark:bg-inputColorDark dark:text-textDark
                focus:outline-primaryLight dark:focus:outline-primaryDark ${
                  validcredentials === false ? "focus:outline-red-500" : ""
                }`}
                onChange={handlecredentialsChange}
              />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              className="w-[100%] py-4 px-3 text-[13px] rounded-xl focus:outline outline-1 bg-inputColorLight dark:bg-inputColorDark dark:text-textDark
                focus:outline-primaryLight dark:focus:outline-primaryDark"
              onChange={handleInputChange}
            />
            <div className="relative">
              <div className="absolute top-[50%] right-[15px] -translate-y-1/2 text-[20px]">
                {isUsernameAvailable === true ? (
                  <CiCircleCheck className="text-[30px] text-green-500 cursor-pointer" />
                ) : isUsernameAvailable === false ? (
                  <div className="relative">
                    <CiCircleRemove className="text-[30px] text-red-500" />
                  </div>
                ) : null}
              </div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-[100%] py-4 px-3 text-[13px] rounded-xl focus:outline outline-1 bg-inputColorLight dark:bg-inputColorDark dark:text-textDark
                focus:outline-primaryLight dark:focus:outline-primaryDark"
                maxLength={20}
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="relative">
              <div className="absolute top-[50%] right-[15px] -translate-y-1/2 text-[20px]">
                {isPasswordStrong === true ? (
                  <CiCircleCheck className="text-[30px] text-green-500 cursor-pointer" />
                ) : isPasswordStrong === false ? (
                  <div className="relative">
                    <CiCircleRemove className="text-[30px] text-red-500" />
                  </div>
                ) : null}
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="new-password"
                className="w-[100%] py-4 px-3 text-[13px] rounded-xl focus:outline outline-1 bg-inputColorLight dark:bg-inputColorDark dark:text-textDark
            focus:outline-primaryLight dark:focus:outline-primaryDark"
                onChange={handlePasswordChange}
              />
            </div>
            <button
              onClick={handleSignup}
              className="w-[100%] py-4 px-3 rounded-xl 
              bg-[#101010] hover:bg-[#202020]  transition dark:bg-gradient-to-r dark:from-teal-400 dark:to-blue-300 dark:hover:from-teal-500 dark:hover:to-blue-400 text-textDark dark:text-textLight"
            >
              {isLoading ? <Loading /> : "Signup"}
            </button>
          </form>
          <p className="text-[13px] cursor-pointer text-textLight dark:text-textDark">
            Allready have an account?{" "}
            <Link to={"/login"} className="font-bold cursor-pointer">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
