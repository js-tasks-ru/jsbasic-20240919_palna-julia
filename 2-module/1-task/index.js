function sumSalary(salaries) {
  let sum = 0;

  for (let key in salaries) {
    const value = salaries[key];
    const isNumber = typeof value === "number";

    if (isNumber && isFinite(value)) {
      sum = sum + value;
    }
  }

  return sum;
}
