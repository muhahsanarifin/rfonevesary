import { useState } from "react";
import { useDispatch } from "react-redux";
import { authAction } from "../redux/reducers/auth";
import * as random from "../helpers/handleRandom";
import * as promise from "../helpers/promise";
import { FaLocationDot } from "react-icons/fa6";
import PropTypes from "prop-types";

export const Login = () => {
  const dispatch = useDispatch();
  const [body, setBody] = useState({
    username: "",
    role: "",
    id_user: "",
    password: null,
  });

  const handleInputLoginAsGuest = (e) => {
    const { value, name } = e.target;

    setBody({
      [name]: value,
      role: "guest",
      id_user: random.userId("guest", value.trimStart()),
      password: null,
    });
  };

  const handleLoginAsGuest = async (e) => {
    e.preventDefault();

    await promise.body(dispatch(authAction.login(body)));
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content lg:flex-col flex-row-reverse">
        <div className="lg:text-center text-left">
          <h1 className="text-3xl font-bold">
            <span className="text-teal-600">Rfonevesary</span> | Login now as
            Guest!
          </h1>
          <p className="py-6">
            Unlock the world of two-wheeled possibilities! Log in to discover
            the perfect bike that suits your style and journey with our
            extensive collection of premium bicycles.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleLoginAsGuest}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">username</span>
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                className="input input-bordered focus:ring-2 focus:border-none focus:ring-[#0D9488] focus:outline-none"
                required
                onChange={handleInputLoginAsGuest}
              />
            </div>
            <div className="form-control mt-6">
              <button
                className={
                  Object.values(body).includes("") ? "btn" : "btn btn-login"
                }
                disabled={Object.values(body).includes("")}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const AdminLogin = () => {
  const [body, setBody] = useState({
    user_id: "",
    email: "",
    password: "",
    role: "",
  });

  const handleLoginAsAdmin = () => {};

  const handleInputLoginAsAdmin = () => {};

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content lg:flex-col flex-row-reverse">
        <div className="lg:text-center text-left">
          <h1 className="text-3xl font-bold">
            <span className="text-teal-600">Rfonevesary</span> | Login now as
            Admin!
          </h1>
          <p className="py-6">
            Unlock the world of two-wheeled possibilities! Log in to discover
            the perfect bike that suits your style and journey with our
            extensive collection of premium bicycles.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleLoginAsAdmin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">email</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                className="input input-bordered focus:ring-2 focus:border-none focus:ring-[#0D9488] focus:outline-none"
                required
                onChange={handleInputLoginAsAdmin}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">password</span>
              </label>
              <input
                type="text"
                name="password"
                id="password"
                placeholder="password"
                className="input input-bordered focus:ring-2 focus:border-none focus:ring-[#0D9488] focus:outline-none"
                required
                onChange={handleInputLoginAsAdmin}
              />
            </div>
            <div className="form-control mt-6">
              <button
                className={
                  Object.values(body).includes("") ? "btn" : "btn btn-login"
                }
                disabled={Object.values(body).includes("")}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const CustomerLogin = () => {
  const [body, setBody] = useState({
    user_id: "",
    email: "",
    password: "",
    role: "",
  });

  const handleLoginAsCustomer = () => {};

  const handleInputLoginCustomer = () => {};

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content lg:flex-col flex-row-reverse">
        <div className="lg:text-center text-left">
          <h1 className="text-3xl font-bold">
            <span className="text-teal-600">Rfonevesary</span> | Login now as
            Customer!
          </h1>
          <p className="py-6">
            Unlock the world of two-wheeled possibilities! Log in to discover
            the perfect bike that suits your style and journey with our
            extensive collection of premium bicycles.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleLoginAsCustomer}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">email</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                className="input input-bordered focus:ring-2 focus:border-none focus:ring-[#0D9488] focus:outline-none"
                required
                onChange={handleInputLoginCustomer}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">password</span>
              </label>
              <input
                type="text"
                name="password"
                id="password"
                placeholder="password"
                className="input input-bordered focus:ring-2 focus:border-none focus:ring-[#0D9488] focus:outline-none"
                required
                onChange={handleInputLoginCustomer}
              />
            </div>
            <div className="form-control mt-6">
              <button
                className={
                  Object.values(body).includes("") ? "btn" : "btn btn-login"
                }
                disabled={Object.values(body).includes("")}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const ShippingDetail = ({ bodySD, handleInputChangeSD }) => {
  const shippingDetailData = [
    {
      label: "Receiver*",
      name: "receiver",
      id: "receiver",
      type: "text",
      className:
        "w-full px-2 input input-bordered focus:ring-1 focus:ring-gray-700 focus:border-0 focus:outline-none input-sm",
      value: bodySD.receiver,
      handleInputChangeSD: handleInputChangeSD,
      disable: true,
    },
    {
      label: "Email*",
      name: "email",
      id: "email",
      type: "text",
      className:
        "w-full px-2 input input-bordered focus:ring-1 focus:ring-gray-700 focus:border-0 focus:outline-none input-sm",
      value: bodySD.email,
      handleInputChangeSD: handleInputChangeSD,
      disable: false,
    },
    {
      label: "No.Hp*",
      name: "noHp",
      id: "noHp",
      type: "number",
      className:
        "w-full px-2 input input-bordered focus:ring-1 focus:ring-gray-700 focus:border-0 focus:outline-none input-sm",
      value: bodySD.noHp,
      handleInputChangeSD: handleInputChangeSD,
      disable: false,
    },
    {
      label: "Address*",
      name: "address",
      id: "address",
      type: "text",
      className:
        "w-full px-2 input input-bordered focus:ring-1 focus:ring-gray-700 focus:border-0 focus:outline-none input-sm",
      value: bodySD.address,
      handleInputChangeSD: handleInputChangeSD,
      disable: false,
    },
    {
      label: "Notes*",
      name: "notes",
      id: "notes",
      type: "",
      className:
        "textarea w-full border-none bg-transparent px-2 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm input-sm",
      value: bodySD.notes,
      handleInputChangeSD: handleInputChangeSD,
      disable: false,
    },
  ];

  return (
    <div className="my-8">
      <div className="text-medium font-semibold flex gap-x-2 items-center">
        <FaLocationDot />
        <span>Shipping Detail</span>
      </div>
      <div className="flow-root">
        <dl className="-my-3 divide-y divide-gray-100 text-sm">
          {shippingDetailData.map((detail) => (
            <div
              className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4"
              key={detail.id}
            >
              <dt className="font-medium text-gray-900">
                <label className="label">
                  <span className="label-text">{detail.label}</span>
                </label>
              </dt>
              {detail.id !== "notes" ? (
                <dd className="text-gray-700 sm:col-span-2">
                  <input
                    name={detail.name}
                    id={detail.id}
                    type={detail.type}
                    value={detail.value}
                    className={detail.className}
                    onChange={detail.handleInputChangeSD}
                    disabled={detail.disable}
                  />
                </dd>
              ) : (
                <dd className="text-gray-700 sm:col-span-2">
                  <textarea
                    name={detail.name}
                    id={detail.id}
                    value={detail.value}
                    className={detail.className}
                    onChange={detail.handleInputChangeSD}
                    disabled={detail.disable}
                  ></textarea>
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
      <div className="my-1">
        <ul className=" text-red-400">
          <li className="text-xs font-semibold">
            <span className="font-semibold">*</span> Must be filled
          </li>
        </ul>
      </div>
    </div>
  );
};

ShippingDetail.propTypes = {
  bodySD: PropTypes.object,
  handleInputChangeSD: PropTypes.func,
};
