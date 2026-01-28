import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks";

export default function RedirectRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // or spinner

  if (isAuthenticated) return <Navigate to="/blog/posts" replace />;
  return <Navigate to="/login" replace />;
};
