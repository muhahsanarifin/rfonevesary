import * as Products from "../components/Products";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Crousel from "../components/Crousel";
import * as Toast from "../components/Toast";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth?.login);
  const reward = useSelector((state) => state.feed.all?.reward);
  return (
    <main>
      <section>
        <Header />
      </section>
      {reward?.isVisible ? (
        <>{auth?.isLogin ? <Toast.Reward /> : null}</>
      ) : null}
      <section className="mx-24 my-24 sm:my-0 sm:mx-6">
        <Crousel />
      </section>
      <section className="mx-24 sm:mx-0">
        <Products.Collection />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
};

export default Dashboard;
