function truncate(str, maxlength) {
  const length = str.length;
  const isLessNumberCharacters = length <= maxlength;

  if (isLessNumberCharacters) {
    return str;
  }

  const modifiedString = str.slice(0, maxlength - 1) + "…";
  return modifiedString;
}
