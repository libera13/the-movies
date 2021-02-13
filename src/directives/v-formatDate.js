const setValue = function(el, binding) {
  const value = binding.value;
  const dateArray = value.split("-");
  const monthsArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  el.innerText = `${dateArray[2]} ${monthsArray[+dateArray[1] - 1]} ${
    dateArray[0]
  }`;
};
module.exports = {
  isLiteral: true,
  bind(el, binding) {
    setValue(el, binding);
  },
  update(el, binding) {
    setValue(el, binding);
  }
};
