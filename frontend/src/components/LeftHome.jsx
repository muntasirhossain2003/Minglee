import { FaRegHeart } from "react-icons/fa";
import logo from "../assets/icon.png";
const LeftHome = () => {
  return (
    <div className="w-[25%] hidden lg:block min-h-[100vh] bg-[black] border-r-2 border-gray-900">
      <div>
        <img src={logo} alt="logo" />
        <div>
          <FaRegHeart size={30} color="white" />
        </div>
      </div>
    </div>
  );
};

export default LeftHome;
