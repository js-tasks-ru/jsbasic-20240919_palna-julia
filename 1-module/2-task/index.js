/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 */
function isValid(name) {
  const isEmpty = name === null || name === undefined || name === "";

  if (isEmpty) {
    return false;
  }

  const isIncludesGap = name.includes(" ");
  const isMinLength = name.length >= 4;

  return !isIncludesGap && isMinLength;
}

function sayHello() {
  let userName = prompt("Введите ваше имя");

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print("Некорректное имя");
  }
}
