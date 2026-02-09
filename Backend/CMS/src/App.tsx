import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import BlogCreate from "./pages/CreateBlog";
import Subscribers from "./pages/Subscribers";
import { AuthProvider } from "./utils/contexts.auth";
import ProtectedRoute from "./utils/protected";
import MainLayout from "./layouts/MainLayout";
import RedirectAuth from "./utils/redirect.auth";
import RedirectBlog from "./utils/redirect.blog";
function App() {
  return (
    <AuthProvider>
      {/* Routes start here */}
      <Routes>
        <Route path="/" element={<RedirectAuth />} />
        <Route path="/login" element={<Login />} />
        {/* Main Layout renders the following */}
        <Route
          path="/blog"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <RedirectBlog />
              </ProtectedRoute>
            }
          />
          <Route
            index
            path="posts"
            element={
              <ProtectedRoute>
                <Blogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="posts/:id"
            element={
              <ProtectedRoute>
                <Blog />
              </ProtectedRoute>
            }
          />
          <Route
            path="posts/create"
            element={
              <ProtectedRoute>
                <BlogCreate />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/subscribers" element={<MainLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Subscribers />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      {/* Routes End */}
    </AuthProvider>
  );
}

export default App;
