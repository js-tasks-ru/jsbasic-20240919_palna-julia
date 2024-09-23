function ucFirst(str) {
  const isEmpty = str === "";

  if (isEmpty) {
    return str;
  }

  const firstLetter = str[0].toUpperCase();
  const endString = str.slice(1);

  const modifiedString = firstLetter + endString;
  return modifiedString;
}
