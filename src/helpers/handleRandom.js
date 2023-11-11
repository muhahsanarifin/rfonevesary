import PropTypes from "prop-types";

export const orderId = () => {
  return (
    "rfone" +
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 5)
  );
};

export const userId = (role, name) => {
  return (
    "rfone" +
    role +
    name +
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 5)
  );
};

userId.propTypes = {
  role: PropTypes.string,
  name: PropTypes.string,
};
