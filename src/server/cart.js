let add = (cart, req) => {
  cart.push(req.body);
  return JSON.stringify(cart, null, 4);
};

let change = (cart, req) => {
  let find = cart.find((el) => el.id === +req.params.id);
  find.quantity = req.body.quantity;
  return JSON.stringify(cart, null, 4);
};

let del = (cart, req) => {
  return JSON.stringify(
    cart.filter((item) => item.id != req.params.id),
    null,
    4
  );
};

module.exports = {
  add,
  change,
  del,
};
