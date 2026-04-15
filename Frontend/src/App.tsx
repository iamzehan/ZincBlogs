import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import HomeLayout from "./layouts/MainLayout";
import BlogsDetail from "./pages/BlogDetail";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import LoginPage from "./pages/Login";
import { AuthProvider } from "./utils/contexts.auth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/blogs">
            <Route index element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogsDetail />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        
        <Route path="/api/subscribe/verify-email" element={<VerifyEmail />} />
        
      </Routes>
    </AuthProvider>
  );
}
export default App;
