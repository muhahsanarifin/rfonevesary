export const number = (string) => {
  const lastFourDigits = string.slice(-3);
  return lastFourDigits.padStart(string.length, "*");
};

export const email = (email) => {
  let realSentence = email.slice(email[1], email.indexOf("@") - 1),
    markedSentence = "";

  for (let idx = 0; idx < realSentence.length; idx++) {
    markedSentence += "*";
  }

  return email[0] + markedSentence + email.slice(email.indexOf("@") - 1);
};
