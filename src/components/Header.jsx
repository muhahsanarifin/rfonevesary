import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { subTotal } from "../helpers/handleCalculation";
import { authAction } from "../redux/reducers/auth";
import { feedAction } from "../redux/reducers/feed";
import rupiah from "../helpers/handleCurrency";
import { AiOutlineLogin } from "react-icons/ai";
import * as Feed from "../components/Feed";
import * as promise from "../helpers/promise";
import * as validate from "../helpers/validate";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCart = useSelector((state) => state.confirmation?.addToCart);
  const auth = useSelector((state) => state.auth?.login);
  const intro = useSelector((state) => state.feed.all.intro);
  const allDataGuest = useSelector((state) => state.auth?.allDataGuest);
  const introFeed = useSelector((state) => state.feed.all.intro);

  const handleNavigateCheckout = () => {
    navigate("/cart");
  };

  const handleLogout = async () => {
    const RADGBody =
      allDataGuest.data?.length === 0
        ? [{ username: auth.data?.username }]
        : allDataGuest?.data.concat([{ username: auth.data?.username }]);

    await promise.body(dispatch(authAction.retriveAllDataGuest(RADGBody)));

    await promise.body(dispatch(authAction.logout()));

    await promise.body(
      dispatch(
        feedAction.clearFeed({
          intro: { isVisible: introFeed?.isVisible },
          reward: {
            isVisible: true,
          },
        })
      )
    );

    navigate("/dashboard");
  };

  return (
    <header className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end gap-4 sm:gap-0">
          <div className="flex items-center gap-4">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {addToCart.data?.length ? (
                    <span className="badge badge-sm badge-cart indicator-item">
                      {addToCart.data?.length}
                    </span>
                  ) : null}
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">
                    {addToCart.data?.length
                      ? addToCart.data?.length + " Items"
                      : "0 Item"}
                  </span>
                  <span className="text-xs font-semibold text-gray-700">
                    Subtotal: {rupiah(subTotal(addToCart?.data))}
                  </span>
                  <div className="card-actions">
                    <button
                      className={`btn-block ${
                        !addToCart.data?.length ? "btn" : "btn btn-cart "
                      }`}
                      disabled={!addToCart.data?.length}
                      onClick={handleNavigateCheckout}
                    >
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              {auth?.isLogin ? (
                <>
                  {validate.allowedRoles(auth?.data?.role) ? (
                    <div className="w-10 rounded-full">
                      <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  ) : (
                    <p className="text-xs font-semibold">Guest</p>
                  )}
                </>
              ) : (
                <AiOutlineLogin className="h-5 w-5" />
              )}
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {auth?.isLogin ? (
                <>
                  {validate.allowedRoles(auth.data?.role) ? (
                    <>
                      <li>
                        <button className="justify-between">
                          Profile
                          <span className="badge">New</span>
                        </button>
                      </li>
                      <li>
                        <button>Settings</button>
                      </li>
                    </>
                  ) : null}
                  <li>
                    <button onClick={() => navigate("/order/history")}>
                      <span>
                        {validate.allowedRoles(auth.data?.role)
                          ? "My history order"
                          : "Guest history order"}
                      </span>
                    </button>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <li>
                  <button onClick={() => navigate("/auth/login/guest")}>
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
        {intro?.isVisible ? <>{auth?.isLogin ? <Feed.Intro /> : null}</> : null}
      </div>
    </header>
  );
};

export default Header;
