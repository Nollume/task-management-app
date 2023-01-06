export const validateStr = (str: string, nmb: number = 8) : string => {
  let newStr = str.substring(0, nmb);
  if (str.length > nmb) newStr = newStr + "...";
  return newStr;
};
