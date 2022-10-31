function numSeparator(number) {
  let str = number.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return  "$ " + str.join(".");
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export {
  numSeparator,
  capitalizeFirstLetter
}