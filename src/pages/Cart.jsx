import * as Products from "../components/Products";
import Header from "../components/Header";
import Footer from "../components/Footer";
import * as Button from "../components/Button";
import * as Toast from "../components/Toast";
import { useSelector } from "react-redux";

const Cart = () => {
  const addToCartCheckout = useSelector((state) => state.checkout.addToCart);

  return (
    <main >
      <section>
        <Header />
      </section>
      <section className="mx-4">
        <Button.BackToDashboard />
      </section>
      <section>
        <Products.Cart />
      </section>
      {addToCartCheckout?.isAddToCart ? (
        <Toast.Success msg={addToCartCheckout?.msg} />
      ) : null}
      <section>
        <Footer />
      </section>
    </main>
  );
};

export default Cart;
