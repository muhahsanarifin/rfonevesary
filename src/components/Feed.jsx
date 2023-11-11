import Images from "../utils/images";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import * as Button from "./Button";
import { feedAction } from "../redux/reducers/feed";

export const Empty = ({ msg }) => {
  return (
    <div className="pt-8 pb-32 flex flex-col gap-y-8">
      <img
        src={Images.EmptyCartIcon}
        alt="Empty Cart"
        className="w-64 h-64 mx-auto"
      />
      <h1 className="mx-auto font-medium text-2xl">{msg}</h1>
    </div>
  );
};

Empty.propTypes = {
  msg: PropTypes.string,
};

export const Intro = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth?.login);
  const reward = useSelector((state) => state.feed.all?.reward);

  const handleInvisibleIntro = () => {
    dispatch(
      feedAction.clearFeed({
        intro: {
          isVisible: false,
        },
        reward: {
          isVisible: reward?.isVisible,
        },
      })
    );
  };
  return (
    <div className="mt-8 mx-20 flex gap-x-4 sm:mx-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-2xl">
          <span className="text-teal-700">Welcome</span>, {auth.data?.username}
          🖐
        </h1>

        <p className="mt-1.5 text-sm text-gray-500">
          Welcome to our bike emporium, your one-stop destination for all things
          cycling. From cutting-edge bikes to top-notch accessories, we&apos;ve
          got everything you need to make your ride extraordinary. Start
          exploring now! 🏍
        </p>
      </div>
      <Button.Cancel setCancel={handleInvisibleIntro} />
    </div>
  );
};

export const DoestNotExist = ({msg}) => {
  return (
    <div className="pt-8 pb-32 flex flex-col gap-y-8">
      <img
        src={Images.DoesNotExistProduct}
        alt="Product Doest Not Exist"
        className="w-64 h-64 mx-auto"
      />
      <h1 className="mx-auto font-medium text-2xl">{msg}</h1>
    </div>
  );
}

DoestNotExist.propTypes = {
  msg: PropTypes.string,
};
