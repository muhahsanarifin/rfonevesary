import Header from "../components/Header";
import Footer from "../components/Footer";
import * as Products from "../components/Products";

const History = () => {
  return (
    <main>
      <section>
        <Header />
      </section>
      <section >
        <Products.History />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
};

export default History;
