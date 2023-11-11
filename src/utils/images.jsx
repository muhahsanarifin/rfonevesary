import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import PropTypes from "prop-types";

import EmptyCartIcon from "../assets/images/empty_cart.svg";
import DoesNotExistProduct from "../assets/images/product-hunt.svg";

const Images = {
  EmptyCartIcon,
  DoesNotExistProduct,
};

export default Images;

export const LLImage = ({ image, alt, className }) => {
  return (
    <LazyLoadImage
      alt={alt}
      effect="blur"
      src={image}
      className={className}
    />
  );
};

LLImage.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};
