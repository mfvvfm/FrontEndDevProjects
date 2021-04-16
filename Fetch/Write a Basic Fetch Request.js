// 1. Selects classes to print to
const select = document.getElementById('breeds');
const card = document.querySelector('.card');
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

/* 4. Create a new fetch request, pass method url */

fetch('https://dog.ceo/api/breeds/list')
// 4.1 Chain '.then()' method that converts data and response to json
  .then(response => response.json())
// 4.2 Once we have our json data we can render list of options inside select element
// 6. Call 'generateOptions' in our '.then()' method passing it 'data.message'
  .then(data => generateOptions(data.message))

/* 2. First type fetch method and pass URL to fetch as string, this will return a Promise.
 Promises are executed in sequence */
fetch('https://dog.ceo/api/breeds/image/random')
  // 2.1 Next chain a then method to fetch and pass func using arrow func that takes a parameter 'response'.
 // Data is in the body of property of the response object API returns data in JSON so in order to access and use the data, we need to parse it to JSON first which is then implicily returned due to our arrow func
  .then(response => response.json())
 // inside this is where we can do something with the json data e.g. iterate over it or inside it into pages content
// In second then method pass a func that takes the json data via parameter'data'
// To access value of message where image is stored log 'data.message' which then produces URL as string
// 3. To populate page with IMG, create call to func named 'generateImage' passing it 'data'message'
  .then(data => generateImage(data.message))
// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

/* 5. Now we can to map or iterate over the items in the array, place them inside option elements and insert them into the select menu */
  function generateOptions(data) {
    // here we use map method to iterate over array and return an option element for each item in the array, the returned value from this function will be stored in the 'options' variable
    // the map call back will take the parameter 'item', once again use template literals to return option elements
    // next use interpolation to insert each returned breed as value of the option and text
    const options = data.map(item => `
      <option value ='${item}'>${item}</option>
 `).join('');
    // The '.join('');' removes commas inserted into the markup in '<option value'
   // Then insert the option elements into the page while setting the innerHTML of the select element to options
    select.innerHTML = options;
}

/* 3.1 Then we create the function, func will take parameter of data, inside the func creat variable named html and assign it template literals to create markup for img*/
  function generateImage(data) {
    //using interpolation set src attribute to value passed in for data, this is the URL returned from API
    const html = `
      <img src='${data}' alt>
      <p>Click to view images of ${select.value}s</p>
    `;
    // select innerHTML of the selected card element to the html variable
    card.innerHTML = html;
  }


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------



// ------------------------------------------
//  POST DATA
// ------------------------------------------
