'use strict';

module.exports = function() {
  return function(galleries, searchTerm){
    let fuzzyRegex = generateFuzzyString(searchTerm);

    return galleries.filter(gallery => {
      return fuzzyRegex.test(gallery.name.toUpperCase());
    });
  };
};

function generateFuzzyString(input) {
  if (!input) return /.*/;
  let fuzzyString = '.*' + input.toUpperCase().split('').join('') + '.*';
  console.log(fuzzyString);
  return new RegExp(fuzzyString);
}