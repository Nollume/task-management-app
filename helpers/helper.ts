export const validateStr = (str: string, nmb: number = 8): string => {
  let newStr = str.substring(0, nmb);
  if (str.length > nmb) newStr = newStr + "...";
  return newStr;
};

export const generateRandomId = (str: string): string => {
  const randomNumber = Math.random() * 1000;
  const concactedStr = str + +randomNumber + "yxz+*";
  return concactedStr
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};
