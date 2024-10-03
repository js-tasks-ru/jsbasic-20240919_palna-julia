function getMinMax(str) {
  const values = str.split(" ");
  const numbers = values
    .map((elemnt) => +elemnt)
    .filter((number) => isFinite(number));

  const minNumber = Math.min(...numbers);
  const maxNumber = Math.max(...numbers);

  return {
    min: minNumber,
    max: maxNumber,
  };
}
