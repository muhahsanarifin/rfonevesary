import * as Products from "../components/Products";
import Header from "../components/Header";
import Footer from "../components/Footer";
import * as Toast from "../components/Toast";
import { useSelector } from "react-redux";

const Order = () => {
  const orderCheckout = useSelector((state) => state.checkout.order);

  return (
    <main>
      <section>
        <Header />
      </section>
      <section>
        <Products.Order />
      </section>
      {orderCheckout?.isOrder ? (
        <Toast.Success msg={orderCheckout?.msg} />
      ) : null}
      <section>
        <Footer />
      </section>
    </main>
  );
};

export default Order;
