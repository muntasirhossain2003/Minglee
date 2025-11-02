import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import getCurrentUser from "./hooks/getCurrentUser";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import getSuggestedUsers from "./hooks/gerSuggestedUsers";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import { Upload } from "./pages/Upload";
import getAllPost from "./hooks/getAllPost";

export const serverUrl = "http://localhost:8000";

const App = () => {
  getCurrentUser();
  getSuggestedUsers();
  getAllPost();
  const { userData } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to={"/"} />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
      />
      <Route
        path="/profile/:userName"
        element={userData ? <Profile /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/editprofile"
        element={userData ? <EditProfile /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/editprofile"
        element={userData ? <EditProfile /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/upload"
        element={userData ? <Upload /> : <Navigate to={"/signin"} />}
      />
    </Routes>
  );
};

export default App;
