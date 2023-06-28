import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ user, children }: {
    user: any;
    children: React.ReactNode;
}) => {
  if (!user) {
    return <Navigate to="/landing" replace />;
  }

  return children;
};