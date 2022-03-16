'use strict';

const weekdays2 = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays2[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays2[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays2[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // ES6 ENHANCED OBJECT LITERALS
  openingHours,

  // receiving just one object, then destructuring it
  // names have to match the object passed into
  // order of parameters does NOT matter
  orderDelivery({
    starterIndex: sI = 1,
    mainIndex: mI = 0,
    time: t = '22:00',
    address: a,
  }) {
    console.log(
      `You've ordered (${this.starterMenu[sI]}, ${this.mainMenu[mI]}) to be delivered to ${a} at ${t}.`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here's your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  // ES6 SYNTAX IMPROVEMENT
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  },
};

//------------------------------------------------------
/* ARRAY DESTRUCTURING
+ ES6 feature
+ unpacking an object structure
+ break complex data structure into smaller data structures, down to primitives

*/

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// switching variables
[secondary, main] = [main, secondary];
console.log(main, secondary);

// returning multiple values from a function
// destructuring
const [starterItem, mainCourse] = restaurant.order(2, 0);
console.log(starterItem, mainCourse);

// nested arrays
const nestedArrays = [2, 4, [5, 6]];
let [n1, , n3] = nestedArrays;
n1 = 7;
console.log(n1, n3);
console.log(nestedArrays);

// nested destructuring
const [i, , [j, k]] = nestedArrays;
console.log(i, j, k);

// default values when unpacking
const [p = 0, q = 0, r = 0] = [8, 9];
console.log(p, q, r);

//------------------------------------------------------
// OBJECT DESTRUCTURING
// using curly braces, as we want to create an object too
// using the exact same property names as in the source object
const { name: localName, openingHours2, categories } = restaurant;
console.log(localName, openingHours2, categories);

// changing variable names
const [newName, newOpeningHours, newCategories] = [
  name,
  openingHours,
  categories,
];
console.log(newName, newOpeningHours, newCategories);

// another way of making default values
// **THIS IS IMPORTANT** //
// from an object named restaurant, take its properties of name, openinghors and categories, and assign them to restaurantName, hours and tags respectively
// also, set up shortcakeMenu with a default value if it doesn't exist
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
  menu: shortcakeMenu = [],
} = restaurant;

console.log(restaurantName, hours, tags, shortcakeMenu);

// mutating variables while destructuring
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

// wrapping the whole line inside a parenthesis is the only way to avoid error
// starting a line with a code block has its pitfalls!
({ a, b } = obj);
console.log(a, b);

//------------------------------------------------------
// NESTED OBJECT DESTRUCTURING
const { fri: { open: o, close: c } = [] } = openingHours;
console.log(o, c);

const {
  openingHours: {
    sat: { open: oP, close: cL },
  },
} = restaurant;
console.log(oP, cL);

// passing just one object to the method
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 23',
  mainIndex: 2,
  starterIndex: 1,
});

//------------------------------------------------------
// SPREAD OPERATOR
// ...
// takes all of the elements
// doesn't create new variables
// iterables - arrays, strings, maps, sets, BUT NOT OBJECTS

const arr = [7, 8, 9];
const badNewArray = [1, 2, ...arr];
console.log(...badNewArray);

const newMenu = [...restaurant.mainMenu, 'my New creation, buahahahaha!'];
console.log(newMenu);

// USAGE
// shallow copies of arrays
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

// merging 2 arrays together
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [...arr1, ...arr2];
console.log(...arr3);
const wholeMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(wholeMenu);

// spreading strings ...
const str = 'Aleksander';
const strArray = [...str, ' ', 'J.'];
console.log(strArray);
// string literals are not a place to use spread operator, as it's not a place that expects multiple values separated by a comma
// console.log(`${...str} won't work properly`);

/*
const ingredients = [
  prompt(`Let's make pasta, ingredient1: `),
  prompt(`Let's make pasta, ingredient2: `),
  prompt(`Let's make pasta, ingredient3: `),
];

restaurant.orderPasta(...ingredients);
*/

// objects are not iterable ... yet spread operator works on them too!
const newRestaurant = {
  ...restaurant,
  founder: 'Giuseppe Orlando',
  foundedIn: 1991,
};

console.log(newRestaurant);

// we did make a copy of original object!
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurant.name);

//------------------------------------------------------
// REST OPERATOR
// on the left side of equal sign
// it has to be the last operator in the line

// 1) destructuring
const [aa, bb, ...rest] = [1, 2, 3, 4, 5, 6];
console.log(aa, bb, rest);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// in objects ...
// the remaining elements will be collected into a new object, not an array
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

// 2) functions
const add = function (...numbers) {
  // let sum = 0;
  // for (let i = 0; i < arguments.length; i++) {
  //   sum += arguments[i];
  // }
  // return sum;
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
};

const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9];
console.log(add(...testArray));

const x = [23, 5, 7].reduce((a, b) => a + b, 0);
console.log(x);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');

restaurant.orderPizza('mushrooms');

//------------------------------------------------------
// LOGICAL OPERATORS
// can use any data type
// can return ANY data type
// short-circuiting evaluation
// the first non-falsy value gets returned on the spot, or the last falsy
console.log('------ OR -------');
console.log(3 || 'Jonas');
console.log('' || 'Jonas'); // 'Jonas'
console.log(true || 0); // true
console.log(undefined || null); // null

// &&
console.log(undefined || 0 || '' || 'Hello' || 23 || null); // 'Hello'

restaurant.numGuests = 23;
console.log(typeof restaurant.numGuests);
const guests1 = restaurant.numGuests != undefined ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('------ AND -------');
// immediately returns the first falsy value or return the last truly
console.log(0 && 'jonas');
console.log(true && 'jonas' && 17);
console.log('Hello' && 23 && null && 'Jonas'); // null

if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
// this can be replaced with
// no need for if-statement
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

//------------------------------------------------------
// NULLISH COALESCING OPERATOR
// ES2020
// nullish values instead of falsy
// null, undefined
// doesn't include 0 or an empty string - they're treated like truthy
restaurant.numGuests = 0;
console.log(typeof restaurant.numGuests);
const guests3 = restaurant.numGuests ?? 10;
console.log(guests3);

const guests4 = restaurant.numGuests || 10;
console.log(guests4);

const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

//------------------------------------------------------
// LOGICAL ASSIGNMENT OPERATOR
const rest1 = {
  name: 'Capri',
  numGuests: 0,
};
const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// conventional way
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// logical assignment operator
// it operates the exactly same way as the above
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// console.log(rest1, rest2);

// the bug happens when the value we test against is 0
// it's a falsy value, thus the second argument gets assigned
// which leads to errors, because sometimes 0 and '' are valid values
// in that case, it's better to use ??=
// LOGICAL NULLISH ASSIGNMENT (null or undefined only)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// LOGICAL && OPERATOR

// rest1.owner = rest1.owner && 'anonymous';
rest1.owner &&= 'anonymous';
rest2.owner &&= 'anonymous';

// the difference between
//    rest1.owner &&= 'anonymous';
// and
//    rest1.owner = rest1.owner && 'anonymous';
// is that in the first case owner does not exists, whereas in the second case owner gets created, yet is set with **undefined** value

console.log(rest1, rest2);

//------------------------------------------------------
// FOR ... OF ... LOOP
// you can use continue and break keywords here
// no access to index of elements
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) {
  console.log(item);
}

// how to get the index, in case you may need it
// array iterators
// console.log([...menu.entries()]);
for (const [index, item] of menu.entries()) {
  console.log(`${index + 1}. ${item}`);
}

//------------------------------------------------------
// ENHANCED OBJECT LITERALS
// 3 ways in ES6
// 1.
// 2.
// 3. we can now computer variable name, instead of typing it statically

//------------------------------------------------------
// OPTIONAL CHAINING
// ?.
// avoid raising an error
// get an undefined value when an optional property does not exist
// works on null and undefined
// 0 and empty strings are still valid
console.log(restaurant.openingHours?.sat?.open);

// example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const el of days) {
  const open = restaurant.openingHours?.[el] ?? 'closed';
  restaurant.openingHours?.[el] && console.log(`Restaurant is open on ${el}`);
  // console.log(
  //   `Restaurant is ${restaurant.openingHours?.[el] && 'not '} open on ${el}`
  // );
  // console.log(el);
}

// the same is useful for methods
console.log(restaurant.order?.(2, 1) ?? `Method does not exist`);

console.log(restaurant.orderRisotto?.(2, 1) ?? `Method does not exist`);

// but what about arrays ...?
const users = [
  {
    name: 'Al-Iskandir',
    email: 'gmail@r41lgun.mock',
  },
];

console.log(users[7]?.name ?? 'Such a player does not exist');

//------------------------------------------------------
// LOOPING OVER OBJECT PROPERTIES - names and values - WHICH ARE NOT ITERABLE

const properties = Object.keys(openingHours);
console.log(properties);
let openStr = `We are open on ${properties.length} days: `;

for (const day of properties) {
  // console.log(day);
  openStr += `${day}, `;
}
console.log(openStr);

// iterating over values
const values = Object.values(openingHours);
console.log(values);

// .entries()
const allEntries = Object.entries(openingHours);
// console.log(allEntries);

for (const [day, { open: o, close: c }] of allEntries) {
  console.log(`On ${day}, we open at ${o} and close at ${c}`);
}
//------------------------------------------------------
// SETS
// a collection of unique values
// creating a new set requires an iterable to be passed at
// can hold a mix of different data types
// no key-value pairs
// order of elements in a set is irrelevant

// MAIN USAGE: REMOVE DUPLICATED VALUES FROM ARRAYS

const orderSets = new Set([
  'Pasta',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
  13,
  '13',
  false,
  'Pizza',
  13,
  true,
  false,
  27,
]);
console.log(orderSets);

console.log(new Set('Aleksander'));

console.log(orderSets.size); // size, not length!
console.log(orderSets.has('Pizza'));
console.log(orderSets.has('Bread'));
orderSets.add('Garlic Bread');
orderSets.add('Garlic Bread');

orderSets.delete(13);
console.log(orderSets);

orderSets.forEach(elem => {
  console.log(elem);
});

const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const diffStaff = new Set(staff);
console.log(diffStaff.size);
console.log(diffStaff);
const uniqueStaff = [...diffStaff];
console.log(uniqueStaff);

// simplifying the above code
console.log(new Set(staff).size);

//------------------------------------------------------
// MAPS
// keys can ahve any types!
// in objects, keys are always strings
// .set() method returns that map
// this allows to chain the execution of adding new stuff
const rest3 = new Map();
rest3.set('name', 'Classico italiano');
rest3.set(1, 'Firenze, Italy');
rest3.set(2, 'Lisbon, Portugal');

console.log(rest3.set('newKey', 'newHole'));

rest3
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('closed', 23)
  .set(true, 'We are open!')
  .set(false, 'We are closed');

// reading data from a map
// .get(key)
// data type matters here, though, so true != 'true' and 1 != '1'
console.log(rest3.get('open'));
console.log(rest3.get(false));

const time = 8;
console.log(rest3.get(rest3.get('open') < time && rest3.get('closed') > time));
// clever, but totally unreadable!

console.log(rest3.has('categories'));
rest3.delete(2);
// rest3.clear();
console.log(rest3.size);

const array7 = [1, 2];
rest3.set(array7, 'Test');
rest3.set(document.querySelector('h1'), 'heading');
console.log(rest3);
console.log(rest3.get(array7));

// CREATING A MAP FROM SCRATCH
// a better way to fill a map with a data
// only use .set() when you want to expand an existing map
const question = new Map([
  ['question', 'What is the best programming language in the world'],
  [1, 'English, dude, English!'],
  [2, 'C'],
  [3, 'Java'],
  [4, 'JavaScript'],
  ['correct', 4],
  [true, 'Correct!'],
  [false, 'Gay move!'],
]);

// CONVERTING AN OBJECT INTO A MAP
console.log(question);
const hoursMap = new Map(Object.entries(restaurant.openingHours));
console.log(hoursMap);

// ITERATING OVER MAP
// maps are iterable
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

// const answer = Number(prompt('Your answer: '));
const answer = 4;

console.log(question.get(answer === question.get('correct')));

// converting map into an array
console.log([...question.entries()]);

//------------------------------------------------------
// STRINGS
// are immutable
// are of primitive type
// all are case-sensitive
// all methods return new strings, since strings are immutable
// regular expressions can be applied to

const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(airline.lastIndexOf('Portugal'));
console.log(airline.slice(4, 10));

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const lastChar = seat.slice(-1);
  console.log(lastChar);
  return lastChar === 'E' || lastChar === 'B';
};

console.log(checkMiddleSeat('11B'));
console.log(checkMiddleSeat('23C'));
console.log(checkMiddleSeat('3E'));

// comparing emails
const email = 'hello@jonas.com';
const loginEmail = '   HeLLo@joNas.Com \n';

const lowerEmail = loginEmail.toLowerCase().trim();
console.log(lowerEmail === email);

// replacing
const priceGB = '288,97Eur';
const priceUS = priceGB.replace(',', '.').replace('Eur', '$');
console.log(priceGB, priceUS);

// REGULAR EXPRESSIONS
const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replace(/door/g, 'gate'));

// BOOLEANS
// includes, startsWith, endsWith

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log(`You are NOT allowed on board!`);
  } else {
    console.log(`Welcome aboard!`);
  }
};

checkBaggage(`I have a laptop, some Food and a pocket Knife`);
checkBaggage('Socks and camera');
checkBaggage('got some snacka and a gun for personal protection');

console.log(...'a+very+nice+string'.split('+'));
console.log('Thomas Anderson'.split(' '));
const [firstName2, lastName2] = 'Thomas Anderson'.split(' ');

const mergedStuff = ['Mr', firstName2, lastName2.toUpperCase()].join(' ');
console.log(mergedStuff);

const capitalizedName = function (name) {
  const names = name.split(' ');
  const capitalizedNames = [];
  for (const word of names) {
    // capitalizedNames.push(word[0].toUpperCase() + word.slice(1));s
    capitalizedNames.push(word.replace(word[0], word[0].toUpperCase()));
  }
  return capitalizedNames;
};

console.log(capitalizedName('jessica ann smith davis').join(' '));
