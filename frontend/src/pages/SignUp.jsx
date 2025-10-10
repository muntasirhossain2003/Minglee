import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import logo from "../assets/logo2.png";

const SignUp = () => {
  const [inputClicked, setInputClicked] = useState({
    name: false,
    useName: false,
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-around items-center">
      <div className="w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]">
        <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-[20px]">
          <div className="flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]">
            <span>Sign Up to</span>
            <img src={logo} alt="Logo" className="w-[100px]" />
          </div>
          {/* name */}
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, name: true })}
          >
            <label
              htmlFor="name"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.name ? "top-[-15px]" : ""
              } `}
            >
              Enter Your Name
            </label>
            <input
              type="text"
              id="name"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
            />
          </div>

          {/* userName */}
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, userName: true })}
          >
            <label
              htmlFor="userName"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.userName ? "top-[-15px]" : ""
              } `}
            >
              Enter Username
            </label>
            <input
              type="text"
              id="userName"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
            />
          </div>

          {/* email */}
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, email: true })}
          >
            <label
              htmlFor="email"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.email ? "top-[-15px]" : ""
              } `}
            >
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
            />
          </div>

          {/* password */}
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, password: true })}
          >
            <label
              htmlFor="password"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.password ? "top-[-15px]" : ""
              } `}
            >
              Enter Your Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
            />

            {!showPassword ? (
              <IoIosEye
                className="absolute cursor-pointer right-[20px] w-[28px] h-[28px]"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(true);
                }}
              />
            ) : (
              <IoIosEyeOff
                className="absolute cursor-pointer right-[20px] w-[28px] h-[28px]"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(false);
                }}
              />
            )}
          </div>
        </div>
        <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black"></div>
      </div>
    </div>
  );
};

export default SignUp;
