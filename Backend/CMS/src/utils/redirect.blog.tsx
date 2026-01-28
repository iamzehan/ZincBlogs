import { Navigate } from "react-router-dom";

const RedirectRoute = () => {
return <Navigate to="/blog/posts" replace />;
  };

export default RedirectRoute;