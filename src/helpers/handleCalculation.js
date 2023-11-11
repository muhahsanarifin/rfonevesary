export const subTotal = (subtotal) => {
  return subtotal?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.subTotal,
    0
  );
};

export const quantityTotal = (data) => {
  return data?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.qty,
    0
  );
};

export const total = (data) => {
  return data?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.total,
    0
  );
};
