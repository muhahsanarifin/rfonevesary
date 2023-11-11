import PropTypes from "prop-types";
import * as Button from "../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { feedAction } from "../redux/reducers/feed";

export const Success = ({ msg }) => {
  return (
    <div className="toast toast-end">
      <div className="alert alert-success sm:flex sm:items-center sm:justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-medium">{msg}</span>
      </div>
    </div>
  );
};

Success.propTypes = {
  msg: PropTypes.string,
};

export const Reward = () => {
  const dispatch = useDispatch();
  const intro = useSelector((state) => state.feed.all.intro);
  const handleInvisibleReward = () => {
    dispatch(
      feedAction.clearFeed({
        intro: { isVisible: intro?.isVisible },
        reward: {
          isVisible: false,
        },
      })
    );
  };

  return (
    <div className="toast toast-end toast-middle z-[100]">
      <aritcle className="flex bg-white transition hover:shadow-xl p-1">
        <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
          <time
            dateTime="2022-10-10"
            className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
          >
            <span>2023</span>
            <span className="w-px flex-1 bg-gray-900/10"></span>
            <span>Rfonevesary</span>
          </time>
        </div>

        <div className="sm:hidden">
          <img
            alt="Guitar"
            src="https://static.vecteezy.com/system/resources/previews/004/924/941/non_2x/grand-prize-3d-text-lotre-free-vector.jpg"
            className="w-32 h-32 object-fit"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6 flex flex-col">
            <input
              value="Buy one motorcycle for all types,will get 1 raffle ticket."
              className="font-bold uppercase text-gray-900 border-none"
              disabled
            />
            <input
              value="The grand prize is a limited edition motorcycle and 10 millions in cash."
              className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700 border-none"
              disabled
            />
          </div>

          <div className="sm:flex sm:items-end sm:justify-end">
            <p className="ml-auto block bg-yellow-300 px-5 py-3 text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400 w-fit">
              Grand prize
            </p>
          </div>
        </div>
        <Button.Cancel setCancel={handleInvisibleReward} />
      </aritcle>
    </div>
  );
};
