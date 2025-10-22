import { useState } from "react";
import { ClipLoader } from "react-spinners";
const ForgotPassword = () => {
  const [step, setStep] = useState(2);
  const [inputClicked, setInputClicked] = useState({
    email: false,
    otp: false,
  });
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-around items-center">
      {step == 1 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Forgot Password</h2>
          {/* email */}
          <div
            className="relative flex items-center mt-[30px] justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black"
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <button
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color={"white"} /> : "Send OTP"}
          </button>
        </div>
      )}

      {step == 2 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Forgot Password</h2>
          {/* email */}
          <div
            className="relative flex items-center mt-[30px] justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, otp: true })}
          >
            <label
              htmlFor="otp"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.otp ? "top-[-15px]" : ""
              } `}
            >
              Enter Your OTP
            </label>
            <input
              type="text"
              id="otp"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />
          </div>
          <button
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color={"white"} /> : "Submit OTP"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
