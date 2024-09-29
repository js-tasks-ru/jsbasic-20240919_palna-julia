function sumSalary(salaries) {
  const values = Object.values(salaries);

  const sum = values.reduce((accumulator, currentValue) => {
    const isNumber = typeof currentValue === "number";

    if (isNumber && isFinite(currentValue)) {
      return accumulator + currentValue;
    }
    return accumulator;
  }, 0);

  return sum;
}
