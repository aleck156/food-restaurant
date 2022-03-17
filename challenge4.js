'use strict';

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const btn = document.querySelector('button');
const textArea = document.querySelector('textarea');
const inputData = [];

btn.addEventListener('click', () => {
  const inputData = textArea.value.split('\n');
  s;
  let marker = `✅`;
  for (const word of inputData) {
    const converted = underScoreToCamelCase(word.trim()).join('');
    console.log(`${converted.padEnd(25)} ${marker}`);
    marker += `✅`;
  }
});

const underScoreToCamelCase = function (word) {
  const splitted = word.toLowerCase().split('_');
  const capitalized = [];
  // the first word is not to be capitalized, so it gets removed from the list
  capitalized.push(splitted.shift());

  for (const word of splitted) {
    capitalized.push(capitalize(word));
  }
  return capitalized;
};

const capitalize = function (word) {
  return word.replace(word[0], word[0].toUpperCase());
};
