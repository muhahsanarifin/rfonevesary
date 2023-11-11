import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export const DirectToDashboard = () => {
  return <Navigate to="/dashboard" replace={true} />;
};

export const PreventBackToLogin = ({ children }) => {
  const auth = useSelector((state) => state.auth.login);
  if (auth?.isLogin) {
    return <Navigate to="/dashboard" replace={true} />;
  }
  return children;
};

PreventBackToLogin.propTypes = {
  children: PropTypes.node,
};

export const PreventDirectToCart = ({ children }) => {
  const addToCart = useSelector((state) => state.confirmation?.addToCart);
  if (!addToCart?.isAddToCart) {
    return <Navigate to="/dashboard" replace={true} />;
  }
  return children;
};

PreventDirectToCart.propTypes = {
  children: PropTypes.node,
};
