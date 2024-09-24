//цикл
function factorial(n) {
  let sum = 1;

  for (let i = n; i > 0; i--) {
    if (i === 0 || i === 1) {
      sum = sum * 1;
    } else {
      sum = sum * i;
    }
  }

  return sum;
}

//рекурсия
// function factorial(n) {
//   let sum = 1;
//   if (n === 1 || n === 0) {
//     return sum * 1;
//   } else {
//     return (sum = n * factorial(n - 1));
//   }
// }

console.log(factorial(0)); // 1
console.log(factorial(1)); // 1
console.log(factorial(3)); // 6
console.log(factorial(5));
