const rupiah = (value) => {
  const options = {
    style: "currency",
    currency: "IDR",
  };
  return Intl.NumberFormat("id-ID", options).format(value);
};

export default rupiah;
