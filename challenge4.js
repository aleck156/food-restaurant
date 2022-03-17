'use strict';

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const btn = document.querySelector('button');
const textArea = document.querySelector('textarea');

btn.addEventListener('click', () => {
  const rows = textArea.value.split('\n');
  let marker = `✅`;
  for (const row of rows) {
    const converted = underScoreToCamelCase(row);
    console.log(`${converted.padEnd(25)} ${marker}`);
    marker += `✅`;
  }
});

const underScoreToCamelCase = function (row) {
  const splittedRow = row.toLowerCase().trim().split('_');
  const capitalized = [];
  // the first word is not to be capitalized, so it gets removed from the list
  capitalized.push(splittedRow.shift());

  for (const word of splittedRow) {
    capitalized.push(capitalize(word));
  }
  return capitalized.join('');
};

const capitalize = function (word) {
  return word.replace(word[0], word[0].toUpperCase());
};
