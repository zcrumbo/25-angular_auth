'use strict';

module.exports = function () {

  return function titleCase(input) {
    function embiggenFirstChar(match, offset, string) {
      console.log(string);
      return match.toUpperCase();
    }
    return input.replace(/\b\w(?=\w{2,})/g, embiggenFirstChar);
  };
};
