import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import getCurrentUser from "./hooks/getCurrentUser";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export const serverUrl = "http://localhost:8000";

const App = () => {
  getCurrentUser(); // Make sure this is a proper hook
  const { userData } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/" replace />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to="/" replace />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/signin" replace />}
      />
      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default App;