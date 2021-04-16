// 1. Selects classes to print to
const select = document.getElementById('breeds');
const card = document.querySelector('.card');
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
/* 2. First type fetch method and pass URL to fetch as string, this will return a Promise.
 Promises are executed in sequence */
// ------------------------------------------
fetch('https://dog.ceo/api/breeds/image/random')
  // 2.1 Next chain a then method to fetch and pass func using arrow func that takes a parameter 'response'.
 // Data is in the body of property of the response object API returns data in JSON so in order to access and use the data, we need to parse it to JSON first which is then implicily returned due to our arrow func
  .then(response => response.json())
 // inside this is where we can do something with the json data e.g. iterate over it or inside it into pages content
// In second then method pass a func that takes the json data via parameter'data'
// To access value of message where image is stored log 'data.message' which then produces URL as string
  .then(data => console.log(data.message))
// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------



// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------



// ------------------------------------------
//  POST DATA
// ------------------------------------------
