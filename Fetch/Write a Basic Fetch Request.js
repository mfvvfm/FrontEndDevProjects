// 1. Selects classes to print to
const select = document.getElementById('breeds');
const card = document.querySelector('.card');
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

/* 7. Create new func called fetchData that takes parameter url
  This will be a wrapper function around fetch so it needs to return a fetch method.
  So our fetchData func will return a promise once the data is retrieved from serve and parsed to JSON
*/
function fetchData(url) {
  return fetch(url)
  // here we parse the json
    .then(res => res.json())
}

/* 4. Create a new fetch request, pass method url */
// 7.1 change 'fetch' to 'fetchData'
fetchData('https://dog.ceo/api/breeds/list')
// 4.1 Chain '.then()' method that converts data and response to json
// 7.2 Since data is already being returned in JSON delete '  .then(response => response.json())' that parse reponse
// 4.2 Once we have our json data we can render list of options inside select element
// 6. Call 'generateOptions' in our '.then()' method passing it 'data.message'
  .then(data => generateOptions(data.message))

/* 2. First type fetch method and pass URL to fetch as string, this will return a Promise.
 Promises are executed in sequence */
// 7.1 change 'fetch' to 'fetchData'
fetchData('https://dog.ceo/api/breeds/image/random')
  // 2.1 Next chain a then method to fetch and pass func using arrow func that takes a parameter 'response'.
 // Data is in the body of property of the response object API returns data in JSON so in order to access and use the data, we need to parse it to JSON first which is then implicily returned due to our arrow func
// 7.2 Since data is already being returned in JSON delete '  .then(response => response.json())' that parse reponse
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

  // 8. Create new func named fetchBreedImage

function fetchBreedImage() {
  // create var that selects value
  const breed = select.value;
  // Then select image and paragraph element that are being inserted into the card div
  const img = card.querySelector('img');
  // and below select paragraph
  const p = card.querySelector('p');

  // make new fetch request using 'fetchData' func
  // fetchData function returns a promise that will be resolved or fulfilled once the data is retrieved from server and parsed to JSON
  fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
  // so next chain a '.then()' to update img to new img returned by API
  // Pass '.then()' a func that takes parsed data via the parameter 'data'
    .then(data => {
    //set img src to returned URL via 'data.message'
      img.src = data.message;
    // set img alt text to value of breed
      img.alt = breed;
    // update p text content
      p.textContent = `Click to view more ${breed}s`;
    })
 }

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

// 9. Add select and card elements to the new func
// adding eventlister to select menu passing it the 'change' event and 'fetchBreedImage' func as callback

select.addEventListener('change', fetchBreedImage);
// And when the user clicks anywhere inside the card it will load random img of the selected breed
card.addEventListener('click', fetchBreedImage);

// ------------------------------------------
//  POST DATA
// ------------------------------------------
