import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bikes } from "../libs/products";
import { productsAction } from "../redux/reducers/products";
import { confirmationAction } from "../redux/reducers/confirmation";
import { historyAction } from "../redux/reducers/history";
import { checkoutAction } from "../redux/reducers/checkout";
import rupiah from "../helpers/handleCurrency";
import * as Button from "../components/Button";
import * as promise from "../helpers/promise";
import * as random from "../helpers/handleRandom";
import * as Feed from "../components/Feed";
import { LLImage } from "../utils/images";
import { ShippingDetail } from "./Form";
import { createdAt } from "../helpers/handleDate";
import * as masked from "../helpers/handleMasked";
import { subTotal, quantityTotal, total } from "../helpers/handleCalculation";
import * as Input from "../components/Input";
import { useDebounce } from "react-use";

export const Collection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const get = useSelector((state) => state.products?.get);
  const addToCart = useSelector((state) => state.confirmation?.addToCart);
  const auth = useSelector((state) => state.auth?.login);
  const [end, setEnd] = useState(8);
  const [search, setSearch] = useState({
    normalValue: "",
    debouncedValue: "",
  });

  useEffect(() => {
    dispatch(productsAction.get(bikes));
  }, [dispatch]);

  // Add To Cart Handle
  const handleAddToCart = (body) => {
    const { id, discount, image, price, stock, title } = body;
    const bodyHandleAddToCart = {
      id,
      discount,
      image,
      price,
      stock,
      title,
      qty: 1,
      subTotal: price * 1, // qty = 1
      total: discount === 0 ? price * 1 : price * 1 - price * (discount / 100), // qty = 1
    };

    const data =
      addToCart?.data?.length === 0
        ? [bodyHandleAddToCart]
        : addToCart?.data.concat([bodyHandleAddToCart]);

    dispatch(confirmationAction.addToCart(data));
  };

  // Order Handle
  const handleOrder = (body) => {
    const { id, image, price, discount, title } = body;

    const bodyHandleOrder = {
      id,
      image,
      price,
      discount: discount,
      subtotal: price * 1,
      total: discount === 0 ? price : price - price * (discount / 100),
      qty: 1,
      title,
    };
    dispatch(confirmationAction.order(bodyHandleOrder));

    navigate("/order");
  };

  const handleSearchProduct = (e) => {
    const { value } = e.target;

    setSearch({ ...search, normalValue: value });
  };

  useDebounce(
    () => {
      setSearch({ ...search, debouncedValue: search.normalValue });
    },
    2000,
    [search.normalValue]
  );

  const products = get?.data?.filter((product) =>
    search.debouncedValue
      ? product.title.toLowerCase().includes(search.debouncedValue)
      : product
  );

  // Handle load product
  const handleLoadProduct = () => {
    setEnd((value) => value + 8);
  };

  return (
    <div className="mx-auto max-w-screen-xl py-8 sm:px-6 sm:py-12 lg:px-8">
      <header>
        <h2 className="text-2xl font-bold text-teal-700 sm:text-2xl">
          <a href="#productCollection">Product Collection</a>
        </h2>

        <p className="mt-4 max-w-md text-sm text-gray-500">
          Welcome to our exclusive bike collection – where cycling enthusiasts
          find their perfect ride. Explore a diverse range of high-quality bikes
          tailored to suit every rider&apos;s needs, from sleek road bikes to
          rugged mountain bikes, all in one place!
        </p>
      </header>

      <div className="mt-8 flex items-center justify-end">
        <Input.Search setSearch={handleSearchProduct} />
      </div>

      <ul
        className={
          products?.length
            ? "mt-4 grid gap-4 sm:grid-cols-1 grid-cols-4"
            : "flex justify-center"
        }
        id="productCollection"
      >
        {products?.length ? (
          products.slice(0, end).map((product) => (
            <li key={product.id} className="relative">
              {product.discount !== 0 ? (
                <div className="absolute rounded-full py-2 px-4 bg-green-100 right-2 top-2 z-50">
                  <p className="text-xs font-bold">{`Disc.${product.discount}%`}</p>
                </div>
              ) : null}
              <div className="group block overflow-hidden">
                <LLImage
                  image={product.image}
                  alt={product.title}
                  className={
                    "h-[350px] w-full object-cover sm:h-[450px] rounded-md"
                  }
                />

                <div className="relative bg-white pt-3 px-2">
                  <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    {product.title}
                  </h3>

                  <p className="mt-2">
                    <span className="sr-only"> Regular Price </span>

                    <div className="flex gap-x-2 items-center">
                      <span className="flex-1 tracking-wider text-gray-900 flex font-semibold">
                        {" "}
                        {rupiah(product.price)}
                      </span>
                      {/* Quantity Input Components */}
                      <span className="text-xs font-semibold">
                        Stock {product.stock}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      {addToCart.data?.some(
                        (addToCartProduct) => addToCartProduct.id === product.id
                      ) ? (
                        <Button.Info
                          info={`${product.title} added to cart`}
                          title={"Add To Cart"}
                          position={"tooltip-right"}
                        />
                      ) : !auth?.isLogin ? (
                        <Button.Info
                          info={"Must be login"}
                          title={"Add To Cart"}
                          position={"tooltip-right"}
                        />
                      ) : (
                        <button
                          type="button"
                          className="h-10 font-medium uppercase text-xs tracking-wide text-teal-600 transition hover:opacity-75"
                          onClick={() => handleAddToCart({ ...product })}
                        >
                          Add To Cart
                        </button>
                      )}
                      {!auth?.isLogin ? (
                        <Button.Info
                          info={"Must be login"}
                          title={"Order"}
                          position={"tooltip-left"}
                        />
                      ) : (
                        <button
                          type="button"
                          className="h-10 font-medium uppercase text-xs tracking-wide text-teal-600 transition hover:opacity-75"
                          onClick={() => handleOrder({ ...product })}
                        >
                          Order
                        </button>
                      )}
                    </div>
                  </p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <Feed.DoestNotExist msg={"Product does not exist."} />
        )}
      </ul>

      {products?.length > end ? (
        <div className="flex justify-center my-4">
          <Button.More setLoadProduct={handleLoadProduct} />
        </div>
      ) : null}
    </div>
  );
};

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addToCart = useSelector((state) => state.confirmation.addToCart);
  const auth = useSelector((state) => state.auth.login);
  const orderHistory = useSelector((state) => state.history.order);
  const addToCartCheckout = useSelector((state) => state.checkout.addToCart);

  const [bodySD, setBodsySD] = useState({
    receiver: auth?.data?.username || "",
    email: "",
    noHp: "",
    address: "",
    notes: "",
  });

  const handleCancelCartProduct = async () => {
    await promise.body(dispatch(confirmationAction.clearAddToCartData()));
  };

  const handleQtyChange = (productId, newQuantity) => {
    const handleNegativeNumber = (number) => {
      return number < 0 ? "" : number;
    };

    const newAddToCartData = addToCart.data?.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          qty: handleNegativeNumber(newQuantity),
          subTotal: item.price * handleNegativeNumber(newQuantity),
          total:
            item.price * handleNegativeNumber(newQuantity) -
            item.price * (item.discount / 100),
        };
      }
      return {
        ...item,
        subTotal: item.price * handleNegativeNumber(item.qty),
        total:
          item.price * handleNegativeNumber(item.qty) -
          item.price * (item.discount / 100),
      };
    });

    dispatch(confirmationAction.addToCart(newAddToCartData));
  };

  const handleInputChangeSD = (e) => {
    const { name, value } = e.target;

    setBodsySD({ ...bodySD, [name]: value });
  };

  const handleAddToCartCheckout = async () => {
    const body = {
      order_id: random.orderId(),
      products: [...addToCart.data],
      subtotal: subTotal(addToCart.data),
      total: total(addToCart.data),
      qty: quantityTotal(addToCart?.data),
      status: "unpaid",
      createdAt: createdAt(Date.now()),
    };

    await promise.body(dispatch(checkoutAction.addToCart([body])));

    await promise.body(
      dispatch(
        historyAction.order(
          orderHistory?.data?.length < 1
            ? [{ ...body, ...bodySD }]
            : orderHistory.data.concat([{ ...body, ...bodySD }])
        )
      )
    );

    navigate("/order/history");

    await promise.body(dispatch(checkoutAction.clearAddToCartData()));

    await promise.body(dispatch(confirmationAction.clearAddToCartData()));
  };

  const handleDeleteProduct = async (productId) => {
    const dataAddToCart = addToCart?.data.filter(
      (product) => product.id !== productId
    );

    await promise.body(
      dispatch(
        confirmationAction.deleteProductAddToCart(
          addToCart?.data.length < 2
            ? { data: dataAddToCart, isAddToCart: false }
            : { data: dataAddToCart, isAddToCart: true }
        )
      )
    );
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-8 pb-32 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Your Cart
          </h1>
        </header>

        <div className="flex justify-end">
          <Button.Cancel setCancel={handleCancelCartProduct} />
        </div>

        <div className="mt-8">
          <ul className="space-y-4">
            {addToCart.data?.map((product) => (
              <li
                id={product.id}
                className="flex items-center gap-4"
                key={product.id}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-16 w-16 rounded object-cover"
                />

                <div>
                  <h3 className="text-sm text-gray-900">{product.title}</h3>

                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                      <dt className="inline">Price: </dt>
                      <dd className="inline">{rupiah(product.price)}</dd>
                    </div>
                  </dl>
                </div>

                <div className="flex flex-1 items-center justify-end gap-2">
                  <div>
                    <label htmlFor={product.id} className="sr-only">
                      {" "}
                      Quantity{" "}
                    </label>

                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        name={product.id}
                        value={
                          isNaN(product.qty)
                            ? ""
                            : product.qty < 0
                            ? ""
                            : product.qty
                        }
                        id={product.id}
                        className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none focus:ring-2 focus:ring-gray-700 focus:border-0"
                        onChange={(e) =>
                          handleQtyChange(product.id, parseInt(e.target.value))
                        }
                      />
                    </div>
                  </div>

                  <button
                    className="text-gray-600 transition hover:text-red-600"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <span className="sr-only">Remove item</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Shipping Detail */}
          <ShippingDetail
            handleInputChangeSD={handleInputChangeSD}
            bodySD={bodySD}
          />

          <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
            <div className="w-screen max-w-lg space-y-4">
              <dl className="space-y-0.5 text-sm text-gray-700">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd>
                    {isNaN(subTotal(addToCart.data))
                      ? null
                      : rupiah(subTotal(addToCart.data))}
                  </dd>
                </div>

                <div className="flex justify-between !text-base font-medium">
                  <dt>Total</dt>
                  <dd>
                    {isNaN(total(addToCart.data))
                      ? null
                      : rupiah(total(addToCart.data))}
                  </dd>
                </div>
              </dl>

              <div className="flex justify-end">
                <button
                  className={
                    Object.values(bodySD).includes("") ||
                    addToCartCheckout.isAddToCart
                      ? "btn"
                      : "btn btn-checkout"
                  }
                  disabled={
                    Object.values(bodySD).includes("") ||
                    addToCartCheckout.isAddToCart
                  }
                  onClick={handleAddToCartCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Detail = () => {
  return (
    <div className="group relative block overflow-hidden">
      <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
        <span className="sr-only">Wishlist</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>

      <img
        src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80"
        alt=""
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
      />

      <div className="relative border border-gray-100 bg-white p-6">
        <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
          New
        </span>

        <h3 className="mt-4 text-lg font-medium text-gray-900">Robot Toy</h3>

        <p className="mt-1.5 text-sm text-gray-700">$14.99</p>

        <form className="mt-4">
          <button className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105">
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
};

export const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.confirmation?.order);
  const orderCheckout = useSelector((state) => state.checkout.order);
  const orderHistory = useSelector((state) => state.history.order);
  const orderDetailHistory = useSelector((state) => state.history.detail);
  const auth = useSelector((state) => state.auth.login);

  const [body, setBody] = useState({
    order_id: random.orderId(),
    subtotal: order.data?.subtotal,
    total: order.data?.total,
    qty: order.data?.qty || "",
    status: "unpaid",
    createdAt: createdAt(Date.now()),
  });
  const [bodySD, setBodsySD] = useState({
    receiver: auth?.data?.username || "",
    email: "",
    noHp: "",
    address: "",
    notes: "",
  });

  const handleInputChangeSD = (e) => {
    const { name, value } = e.target;

    setBodsySD({ ...bodySD, [name]: value });
  };

  const handleInputOrder = (e) => {
    const handleNegativeNumber = (value) => {
      return value < 0 ? "" : value;
    };

    const { value } = e.target;
    setBody({
      order_id: random.orderId(),
      subtotal:
        handleNegativeNumber(value) > 1
          ? order.data?.price * handleNegativeNumber(value)
          : order.data?.subtotal,
      total:
        order.data?.price * parseInt(handleNegativeNumber(value)) -
        order.data?.price *
          parseInt(handleNegativeNumber(value)) *
          (order.data?.discount / 100),
      qty: parseInt(handleNegativeNumber(value)),
      status: "unpaid",
      createdAt: createdAt(Date.now()),
    });
  };

  const handleOrderCheckout = async (e) => {
    e.preventDefault();

    await promise.body(dispatch(checkoutAction.order([body])));

    await promise.body(
      dispatch(
        historyAction.order(
          orderHistory?.data.length === 0
            ? [
                {
                  ...body,
                  ...bodySD,
                  products: [
                    { ...order.data, qty: body.qty, subtotal: body.subtotal },
                  ],
                },
              ]
            : orderHistory?.data.concat([
                {
                  ...body,
                  ...bodySD,
                  products: [
                    { ...order.data, qty: body.qty, subtotal: body.subtotal },
                  ],
                },
              ])
        )
      )
    );

    await promise.body(
      dispatch(
        historyAction.detail(
          orderDetailHistory?.products?.length === 0
            ? [{ ...order.data, qty: body.qty, subtotal: body.subtotal }]
            : orderDetailHistory.products.concat([
                { ...order.data, qty: body.qty, subtotal: body.subtotal },
              ])
        )
      )
    );

    await promise.body(dispatch(checkoutAction.clearOrderData()));

    navigate("/order/history");

    await promise.body(dispatch(confirmationAction.clearOrderData()));
  };

  const handleRemoveItem = () => {
    navigate("/dashboard");

    dispatch(confirmationAction.clearOrderData());
  };

  return (
    <div className="px-4 pt-8 pb-32 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Your Order
          </h1>
          <div className="ml-auto flex justify-end">
            <Button.BackToDashboard />
          </div>
        </header>

        <div className="mt-8">
          {order?.isOrder ? (
            <>
              <ul className="space-y-4">
                {
                  <li className="flex items-center gap-4">
                    <img
                      src={order.data.image}
                      alt=""
                      className="h-16 w-16 rounded object-cover"
                    />

                    <div>
                      <h3 className="text-sm text-gray-900">
                        {order.data?.title}
                      </h3>

                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                          <dt className="inline">Price: </dt>
                          <dd className="inline">
                            {rupiah(order.data?.price)}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <form>
                        <label htmlFor={order.data?.id} className="sr-only">
                          {" "}
                          Quantity{" "}
                        </label>

                        <input
                          type="number"
                          value={
                            isNaN(body.qty) ? "" : body.qty < 0 ? "" : body.qty
                          }
                          name={order.data?.id}
                          id={order.data?.id}
                          className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none focus:ring-2 focus:ring-gray-700 focus:border-0"
                          onChange={handleInputOrder}
                        />
                      </form>

                      <button
                        className="text-gray-600 transition hover:text-red-600"
                        onClick={handleRemoveItem}
                      >
                        <span className="sr-only">Remove item</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                }
              </ul>

              {/* Shipping Detail */}
              <ShippingDetail
                bodySD={bodySD}
                handleInputChangeSD={handleInputChangeSD}
              />

              <div className="flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>{rupiah(body?.subtotal)}</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>Discount</dt>
                      <dd>
                        {order.data?.discount
                          ? `${order.data?.discount}%`
                          : `0%`}
                      </dd>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <dt>Total</dt>
                      <dd>{isNaN(body?.total) ? null : rupiah(body?.total)}</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                    <button
                      className={
                        orderCheckout?.isOrder ||
                        Object.values(bodySD).includes("")
                          ? "btn"
                          : "btn btn-order"
                      }
                      onClick={handleOrderCheckout}
                      disabled={
                        orderCheckout?.isOrder ||
                        Object.values(bodySD).includes("")
                      }
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Feed.Empty msg={order?.msg} />
          )}
        </div>
      </div>
    </div>
  );
};

export const History = () => {
  const navigate = useNavigate();
  const orderHistory = useSelector((state) => state.history.order);
  const auth = useSelector((state) => state.auth.login);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header className=" mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-teal-700 sm:text-3xl">
          Order History
        </h2>
        <Button.BackToDashboard />
      </header>
      {orderHistory?.data?.filter(
        (data) => data.receiver === auth.data.username
      ).length > 0 ? (
        <ul className=" mt-4 grid gap-4 sm:grid-cols-1 grid-cols-4 ">
          {orderHistory?.data
            ?.filter((data) => data.receiver === auth.data.username)
            .map((order) => (
              <li className="card bg-base-100 shadow-xl " key={order.order_id}>
                <div className="card-body">
                  <div className="flex items-center gap-4">
                    <img
                      alt="Developer"
                      src={order?.products[0]?.image}
                      className="w-20 h-20 rounded-full"
                    />

                    <div>
                      <h3 className="badge badge-secondary text-md p-3">
                        {order.order_id}
                      </h3>

                      <div className="flow-root">
                        <button
                          className="font-medium text-xs text-gray-700"
                          onClick={() =>
                            navigate(`/order/history/detail/${order.order_id}`)
                          }
                        >
                          See detail.
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="card-actions">
                    <div
                      className={`text-xs ${
                        order.status === "unpaid"
                          ? "badge badge-warning"
                          : "badge badge-success"
                      }`}
                    >
                      status: {order.status}
                    </div>
                    <div className="badge badge-success text-xs">
                      Quantity : {order.qty}
                    </div>
                    <div className="badge badge-success text-xs">
                      Total : {rupiah(order.total)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>

                    <p className="text-xs font-medium">{order.createdAt}</p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <Feed.Empty msg={orderHistory?.msg} />
      )}
    </div>
  );
};

export const OrderDetailHistory = () => {
  const { id } = useParams();
  const orderHistory = useSelector((state) => state.history.order);

  const orderDetailHistory = orderHistory?.data?.filter(
    (order) => order.order_id === id
  );

  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
      <header>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-teal-700 sm:text-3xl">
            Order Detail History
          </h2>
          <Button.Previous target={-1} title={"History"} />
        </div>

        <div className="max-w-fit rounded-xl px-6 py-4 shadow-xl hover:shadow-sm mt-6 flex items-center gap-8 text-xs sm:flex sm:flex-wrap">
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <div className="mt-1.5 sm:mt-0">
              <p className="text-teal-700 font-medium">Order ID</p>

              <p className="font-medium"> {orderDetailHistory[0].order_id}</p>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <div className="mt-1.5 sm:mt-0">
              <p className="text-teal-700 font-medium">Receiver</p>

              <p className="font-medium">{orderDetailHistory[0].receiver}</p>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <div className="mt-1.5 sm:mt-0">
              <p className="text-teal-700 font-medium">Email</p>

              <p className="font-medium">
                {masked.email(orderDetailHistory[0].email)}
              </p>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <div className="mt-1.5 sm:mt-0">
              <p className="text-teal-700 font-medium">Address</p>

              <p className="font-medium">{orderDetailHistory[0].address}</p>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <div className="mt-1.5 sm:mt-0">
              <p className="text-teal-700 font-medium">No.Hp</p>

              <p className="font-medium">
                {masked.number(orderDetailHistory[0].noHp)}
              </p>
            </div>
          </div>
        </div>
      </header>

      <ul className="grid gap-4 mt-8 sm:grid-cols-1 grid-cols-4">
        {orderDetailHistory[0].products?.map((product, idx) => (
          <li key={idx}>
            <a href="#" className="block overflow-hidden group">
              <LLImage
                image={product.image}
                alt={product.title}
                className={
                  "h-[350px] w-full object-text-teal-700 font-medium sm:h-[450px]"
                }
              />

              <div className="relative pt-3 bg-white">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <dt className="text-xs">Price</dt>
                    <dd className="text-xs">{rupiah(product?.price)}</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt className="text-xs">Buying Qty</dt>
                    <dd className="text-xs">{product.qty}</dd>
                  </div>
                </dl>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
