// let arr = ["apple", "ball", "caty", "apple", "cat", "apple"];
// let newArr = [];

// // Loop through each element in arr
// for (let i = 0; i < arr.length; i++) {
//   // Check if the element is not already in newArr
//   if (!newArr.includes(arr[i])) {
//     newArr.push(arr[i]); // Add the unique element
//   }
// }

// console.log(newArr); // Output: ["apple", "ball", "caty", "cat"]

// function findMissingNumber(arr, N) {
//     // Calculate the expected sum of the first N natural numbers
//     const expectedSum = (N * (N + 1)) / 2;

//     // Initialize a variable to hold the actual sum
//     let actualSum = 0;

//     // Iterate through the array to calculate the actual sum
//     for (let i = 0; i < arr.length; i++) {
//         actualSum += arr[i]; // Add each element to actualSum
//     }

//     // The missing number is the difference between expected and actual sum
//     return expectedSum - actualSum;
// }

// // Example usage:
// const array = [1, 2, 4, 5]; // N = 5, so the missing number is 3
// const N = 5;
// const missingNumber = findMissingNumber(array, N);
// console.log(`The missing number is: ${missingNumber}`); // Output: The missing number is: 3

// const arr = [1, 2, 0, 1, 0, 4, 0];
// let count = 0;
// let newArr=[]
// for (let i = 0; i < arr.length; i++) {
//   if (arr[i] !== 0) {
//    newArr.push(arr[i])
//   }
// }
// for (let i=newArr.length; i<arr.length; i++){
//     newArr.push(0)
// }
// console.log(newArr);
// let n = 2123; // Original number
// let s = 0; // Variable to hold the reversed number
// let r; // Variable to hold the remainder (last digit)

// while (n !== 0) {
//     r = n % 10; // Get the last digit
//     s = s * 10 + r; // Append it to the reversed number
//     n = Math.floor(n / 10); // Remove the last digit from n
// }

// console.log(s); // Output the reversed number

let arr = [
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
];
let s = 0;
for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 3; col++) {
    if (row == col) {
      s = s + arr[row][col];
    }
  }
}
console.log(s);
