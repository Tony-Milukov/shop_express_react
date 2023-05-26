const productInfoRegExp: { [key: string]: RegExp } = {
  title: /^[\w\s]{2,25}$/,
  price: /^[0-9]*.{1,250}$/,
  count: /^[0-9]*.{1,250}$/,
  description: /^([\w\s]{1,250})$/,
};
const productInfoRegExpErrs: { [key: string]: string } = {
  title: "Please enter a valid product title (2 - 25 symbol). ",
  price: "Please enter a valid price",
  count: "Please enter a valid products availability",
  description: "Please provide some description (max 250 symbol).",
};
export {
  productInfoRegExpErrs,
  productInfoRegExp
}
