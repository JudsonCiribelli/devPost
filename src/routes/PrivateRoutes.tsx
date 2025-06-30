import { type ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";

interface PrivateRoutesProps {
  children: ReactNode;
}

const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
  const { signed, loadingAuth } = useContext(AppContext);

  if (loadingAuth) {
    return <div></div>;
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoutes;
