import * as Products from "../components/Products";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const Product = () => {
  return (
    <main>
      <section>
        <Header />
      </section>
      <section className="flex justify-center">
        <Products.Detail />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
};

export const History = () => {
  return (
    <main>
      <section>
        <Header />
      </section>
      <section>
        <Products.OrderDetailHistory />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
};
