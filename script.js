'use strict';

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

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  // receiving just one object, then destructuring it
  // names have to match the object passed into
  // order of parameters does NOT matter
  orderDelivery: function ({
    starterIndex: sI = 1,
    mainIndex: mI = 0,
    time: t = '22:00',
    address: a,
  }) {
    console.log(
      `You've ordered (${this.starterMenu[sI]}, ${this.mainMenu[mI]}) to be delivered to ${a} at ${t}.`
    );
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
const { name: localName, openingHours, categories } = restaurant;
console.log(localName, openingHours, categories);

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
