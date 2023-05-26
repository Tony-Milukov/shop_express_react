const deliveryInfoRegExp: { [key: string]: RegExp } = {
  company: /^\w{2,50}$/,
  code: /^\w{4,100}$/,
  link: /https?:\/\/\w+\.\w+/,
  extraInfo: /^([\w\s]{0,250})$/,
};
const deliveryInfoRegExpErrs: { [key: string]: string } = {
  company: "Please enter a valid company name (2 - 50 symbol). ",
  code: "Please enter a valid code (4 - 100 symbol).",
  link: "Please enter a valid URL link.",
  extraInfo: "Please provide some additional information (max 250 symbol).",
};
export {
  deliveryInfoRegExp,
  deliveryInfoRegExpErrs
}
