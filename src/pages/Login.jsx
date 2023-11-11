import * as Form from "../components/Form";

export const Guest = () => {
  return (
    <main>
      <Form.Login />
    </main>
  );
};

export const Admin = () => {
  return (
    <main>
      <Form.AdminLogin />
    </main>
  );
};

export const Customer = () => {
  return (
    <main>
      <Form.CustomerLogin />
    </main>
  );
}
