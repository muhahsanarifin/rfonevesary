import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const BackToDashboard = () => {
  const navigate = useNavigate();
  return (
    <button
      className="group flex items-center justify-between gap-4 rounded-lg border-none bg-none px-2 py-2 transition-colors hover:bg-transparent focus:outline-none focus:ring-0"
      onClick={() => navigate("/dashboard")}
    >
      <span className="font-medium text-white transition-colors group-hover:text-teal-600 group-active:text-teal-500 text-sm">
        Back To Dashboard
      </span>

      <span className="shrink-0 rounded-full border border-current bg-white p-2 text-teal-600 group-active:text-teal-500">
        <svg
          className="h-5 w-5 -rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </span>
    </button>
  );
};

export const Info = ({ info, title, position }) => {
  return (
    <div
      className={`tooltip tooltip-error ${position} font-medium uppercase`}
      data-tip={info}
    >
      <button
        className="h-10 font-medium uppercase text-xs tracking-wide text-gray-600 opacity-75 cursor-not-allowed"
        disabled
      >
        {title}
      </button>
    </div>
  );
};

Info.propTypes = {
  info: PropTypes.string,
  title: PropTypes.string,
  position: PropTypes.string,
};

export const Cancel = ({ setCancel }) => {
  return (
    <button className="btn btn-circle btn-cancel btn-outline btn-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={setCancel}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

Cancel.propTypes = {
  setCancel: PropTypes.func,
};

export const Previous = ({ target, title }) => {
  const navigate = useNavigate();
  return (
    <button
      className="group flex items-center justify-between gap-4 rounded-lg border-none bg-none px-2 py-2 transition-colors hover:bg-transparent focus:outline-none focus:ring-0"
      onClick={() => navigate(target)}
    >
      <span className="font-medium text-white transition-colors group-hover:text-teal-600 group-active:text-teal-500 text-sm">
        Back To {title}
      </span>

      <span className="shrink-0 rounded-full border border-current bg-white p-2 text-teal-600 group-active:text-teal-500">
        <svg
          className="h-5 w-5 -rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </span>
    </button>
  );
};

Previous.propTypes = {
  target: PropTypes.number,
  title: PropTypes.string,
};

export const More = ({ setLoadProduct }) => {
  return (
    <>
      <button
        className="group flex items-center justify-between gap-4 rounded-full border border-teal-600 bg-teal-600 py-2 px-6 transition-colors hover:bg-transparent"
        onClick={setLoadProduct}
      >
        <span className="text-sm font-medium text-white transition-colors group-hover:text-teal-600 group-active:text-teal-500">
          More
        </span>
      </button>
    </>
  );
};

More.propTypes = {
  setLoadProduct: PropTypes.func,
};
