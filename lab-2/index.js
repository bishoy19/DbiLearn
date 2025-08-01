// 1- Create a function called ‘capitalizeWords’ that takes a string
// and returns the string with the first letter of each word capitalized.
function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
console.log(capitalizeWords("hello world")); // "Hello World"

//-----------------------

//2- Create a function called ‘mergeSortedArrays’ that takes two
//sort arrays and returns a single sorted array by merging them.
//([1, 3, 5], [2, 4, 6]) ==> [1, 2, 3, 4, 5, 6]

function mergeSortedArrays(arr1, arr2) {
  let result = [],
    i = 0,
    j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) result.push(arr1[i++]);
    else result.push(arr2[j++]);
  }
  while (i < arr1.length) result.push(arr1[i++]);
  while (j < arr2.length) result.push(arr2[j++]);
  return result;
}
console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6]));

//---------------------------
//3- Write a function called ‘sumOfSquares’ that takes an array of
//numbers and returns the sum of their squares.

function sumOfSquares(arr) {
  arr = [1, 2, 3, 4, 10];
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  //arr.reduce((sum, num) => sum + num * num, 0);
  return sum;
}
console.log(sumOfSquares());

//---------------------------
/* 4- Create a function called ‘filterArray’ that takes an array and a
callback function. The filterArray function should return a new array
that contains only the elements for which the callback function
returns true. */
function filterArray(arr, callback) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== callback[i]) {
      result.push(arr[i]);
    }
  }
  return result;
}

console.log(filterArray([1, 3, 2, 5, 6, 7, 8], [1, 2, 3, 4, 5, 8]));

//----------------------------
/* 5- Create a function called ‘mapArray’ that takes an array and a
callback function. The mapArray function should return a new array
where each element is the result of the callback function applied to
the corresponding element of the input array.
 */

function mapArray(arr, callback) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback.includes(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}
console.log(mapArray([1, 3, 2, 5, 6, 7, 8], [1, 2, 3, 4, 5, 8]));

//----------------------------
/* 6- Create a function called ‘reduceArray’ that takes an array, a
callback function, and an initial value. The reduceArray function
should return a single value that is the result of applying the
callback function to each element of the array, using the initial
value as the starting point. */
function reduceArray(array, callback, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < array.length; i++) {
    accumulator = callback(accumulator, array[i]);
  }
  return accumulator;
}
const numbers = [1, 2, 3, 4];
const sum = reduceArray(numbers, (acc, curr) => acc + curr, 0);
console.log(sum);
//----------------------------
/* 7- Create a function called forEachArray that takes an array and a
callback function. The forEachArray function should apply the
callback function to each element of the array. */
function forEachArray(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
}
forEachArray(["A", "B", "C", "k"], (val, i) => {
  console.log(`Index ${i}: ${val}`);
});

//----------------------------
/* 8- Write a function called findMax that takes an array of numbers and
returns the maximum number in the array. */
function findMax(arr) {
  if (arr.length === 0) return null; // Handle empty array case
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

console.log(findMax([10, 50, 20, 90, 300]));

//----------------------------
/* 9- Write a function called mergeObjects that takes two objects and
returns a new object that combines the properties of both. If a
property exists in both objects, the value from the second object
should be used. */

function mergeObjects(obj1, obj2) {
  return { ...obj1, ...obj2 };
}
console.log(
  mergeObjects({ 1: "a", 2: "b", 3: "c" }, { 4: "d", 5: "v", 2: "e" })
);

//----------------------------
/* 10- Write a function called invertObject that takes an object and
returns a new object where the keys and values are swapped.
{ a: 1, b: 2, c: 3 } ==> { 1: 'a', 2: 'b', 3: 'c' } */

function invertObject(obj) {
  const inverted = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      inverted[obj[key]] = key;
    }
  }
  return inverted;
}

console.log(invertObject({ a: 1, b: 2, c: 3 }));
//----------------------------
/* 11- Write a function called omitKeys that takes an object and an
array of keys, and returns a new object that omits the specified keys.
{ a: 1, b: 2, c: 3, d: 4 } ==> omit (b , d) ====> { a: 1, c: 3 } */
function omitKeys(obj, keys) {
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
console.log(omitKeys({ a: 1, b: 2, c: 3, d: 4 }, ["b", "d"]));

//----------------------------
/* 12- Write a function called pickKeys that takes an object and an
array of keys, and returns a new object that includes only the
specified keys.
{ a: 1, b: 2, c: 3, d: 4 } ==> omit (b , d) ====> { b: 2, d: 4 } */

function omitKey(obj, keys) {
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
console.log(omitKey({ a: 1, b: 2, c: 3, d: 4 }, ["b", "d"]));

//----------------------------
/* 13- Write a function called reverseArray that takes an array and
returns a new array with the elements in reverse order. */
function reverseArray(arr) {
  const reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  return reversed;
}
console.log(reverseArray([1, 2, 3, 4, 5]));
//or
const myAyy = [1, 2, 3, 4, 5];
const myRevers = myAyy.slice().reverse();
console.log(myRevers);
//----------------------------
/* 14- Write a function called countOccurrences that takes an array and
a value, and returns the number of times the value appears in the
array. */
function countOccurrences(arr, value) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      count++;
    }
  }
  return count;
}
console.log(countOccurrences([1, 2, 3, 4, 5, 2, 2], 2));
