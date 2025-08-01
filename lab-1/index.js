// 1. Create a function that accepts a variable and returns its type
function getType(value) {
  return typeof value;
}
console.log(getType(42)); // "number"

// 2. Create functions for addition, subtraction, multiplication, and division
function add(a, b) {
  return a + b;
}
console.log(add(5, 3)); // 8

// 3. Create a function that checks if a value is NaN
function isValueNaN(value) {
  return isNaN(value);
}

console.log(isValueNaN("ff")); // true

// 4. Create a function that returns true if a number is even and false if odd
function isEven(number) {
  return number % 2 === 0;
}

console.log(isEven(4)); // true

// 5. Create a function to concatenate two strings with a space in between
function concatenateStrings(str1, str2) {
  return `${str1} ${str2}`;
}
console.log(concatenateStrings("Hello", "World"));

// 6. Create a function that takes a string and returns its uppercase version
function toUpperCase(str) {
  return str.toUpperCase();
}
console.log(toUpperCase("hello"));

// 7. Create a function that takes a string and an index, then returns the character at that index
function getCharAt(str, index) {
  return str.charAt(index);
}

console.log(getCharAt("Hello", 1)); // "e"

// 8. Create a function greet() that takes a name and returns “Hello , name”
function greet(name) {
  return `Hello, ${name}`;
}
console.log(greet("Alice"));

// 9. Create a function that checks if a value is null or undefined
function isNullOrUndefined(value) {
  return value === null || value === undefined;
}

// 10. Create a function that generates a random number between two values
function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
