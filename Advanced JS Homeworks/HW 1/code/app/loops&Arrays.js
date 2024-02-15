//1.Generate an array that has all the numbers that are divisible by 3 from 1 to 1000
let divisibleByThree = [];

for (let i = 1; i <= 1000; i++) {
  if (i % 3 === 0) {
    divisibleByThree.push(i);
  }
}

console.log(divisibleByThree);

//2.Generate an array that has all the even numbers that are divisible by 4 from 1 to 1000
let evenDivisibleByFour = [];

for (let i = 1; i <= 1000; i++) {
  if (i % 2 === 0 && i % 4 === 0) {
    evenDivisibleByFour.push(i);
  }
}

console.log(evenDivisibleByFour);

//3.Generate an array that has all the numbers that end with the digit 1 from 1 to 1000
function generateNumbers() {
  let numbersArray = [];

  for (let i = 1; i <= 1000; i++) {
    if (i % 10 === 1) {
      numbersArray.push(i);
    }
  }

  return numbersArray;
}

const resArray = generateNumbers();

console.log(resArray);

//4.Create a function that cleans an array of any values and leaves only STRINGS
function cleanArray(arr) {
  const cleanedArray = arr.filter(item => typeof item === 'string');
  return cleanedArray;
}

const mixedArray = [1, 'apple', true, 'banana', 42, 'orange', 'grape'];
const resultArray = cleanArray(mixedArray);

console.log(resultArray);

//5.Create a function that cleans an array of any values and leaves only NUMBERS
function cleaningArray(arr) {
  const clArray = arr.filter(item => typeof item === 'number' && !isNaN(item));
  return clArray;
}

const mixArray = [1, 'grape', true, 'cherry', 42, 'lemon', 'potato', NaN, undefined, null];
const rltArray = cleaningArray(mixArray);

console.log(rltArray);

//6. Create a function that cleans undefined, null, NaN, and "" and leaves all other values
function cleanedArray(arr) {
  const cndArray = arr.filter(item => item !== undefined && item !== null && !isNaN(item) && item !== "");
  return cndArray;
}

const mxdArray = [1, 'apple', true, 'banana', 42, 'orange', 'grape', NaN, undefined, null, ''];
const rtArray = cleanedArray(mixedArray);

console.log(rtArray);


