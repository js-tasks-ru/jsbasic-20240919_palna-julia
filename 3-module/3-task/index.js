function camelize(str) {
  const words = str.split("-");

  const newString = words.map((word, index) => {
    if (index === 0) {
      return word;
    }

    return word[0].toUpperCase() + word.slice(1);
  });

  return newString.join("");
}
