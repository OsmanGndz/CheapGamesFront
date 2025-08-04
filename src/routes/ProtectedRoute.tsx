// src/components/ProtectedRoute.tsx
import Spinner from "../components/Spinner";
import { useUser } from "../Context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: any }) => {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) return <Spinner />; // veya bir loading spinner

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
