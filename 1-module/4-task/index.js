function checkSpam(str) {
  const firstTruthValue = "1xBet".toLowerCase();
  const secondTruthValue = "XXX".toLowerCase();

  const stringLowerCase = str.toLowerCase();

  const isIncludesFirstTruthValue = stringLowerCase.includes(firstTruthValue);
  const isIncludesSecondTruthValue = stringLowerCase.includes(secondTruthValue);

  return isIncludesFirstTruthValue || isIncludesSecondTruthValue;
}
