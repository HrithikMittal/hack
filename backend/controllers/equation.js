const Complex = require("complex-js");
const math = require("mathjs");

function isMathExpression(str) {
  const findInd = str.indexOf("=");
  const equ = str.substr(0, findInd);
  const result = str.substr(findInd + 1);

  try {
    Complex.compile(equ);
  } catch (error) {
    return false;
  }
  return true;
}

function isValid(str) {
  const findInd = str.indexOf("=");
  const equ = str.substr(0, findInd);
  const result = str.substr(findInd + 1);

  const value = math.evaluate(equ);
  if (parseInt(result) === parseInt(value)) {
    return true;
  } else {
    return false;
  }
}

module.exports = { isMathExpression, isValid };
