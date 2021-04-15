/* 1. Initialise variables
     - (URL to the API to the api.open endpoint, returns all people       currently in
     - Wiki API endpoint
     - Variables that reference variables in index.html */
const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// Make an AJAX request
// 2. Function getJSON uses XMLHttpRequest (XHR) to retrieve data
//    from a server via a URL withut having to refresh page
// 2.1 Give getJSON a second function as second argument 'callback'. This represents a func that is going to be passed into any getJSON function call. URL is checked first then callback if successful
function getJSON(url, callback) {
  // getJSON function initialises an XMLHttpRequest
  const xhr = new XMLHttpRequest();
  // then getJSON func gets browser ready to make a GET request to the provided URL
  xhr.open('GET', url);
  // 4. XHR request also accepts a callback so as soon as the server sends back its response it runs the callback func assigned to the 'onload' event. In this case it is checking the server response readystate and status then parsing response text to JSON & logging data to console. Anytime the request changes this callback function is going to fire and update the data
  xhr.onload = () => {
    if(xhr.status === 200) {
      // 2.1 callback will be returned from what happens here at a later time. As soon as server sends back response
      let data = JSON.parse(xhr.responseText);
      // returns function as result
      return callback(data);
    }
  };
  // 3. Then sends the request
  xhr.send();
}

// Generate the markup for each profile
// This function 'generateHTML' creates a new section element
function generateHTML(data) {
  //for each person in space
  const section = document.createElement('section');
  // and appends it to the div with the ID people
  peopleList.appendChild(section);
  //Then sets the inner HTML to the markup defined in the template literal using the data passed to the function. This will display astronauts
    section.innerHTML = `
      <img src=${data.thumbnail.source}>
      <h2>${data.title}</h2>
      <p>${data.description}</p>
      <p>${data.extract}</p>
    `;
  }
  //create an eventlistner for the button, as the second argument pass an anonymous function as the callback which will run getJSON as soon as event is clicked
  // Pass a callback to get JSON that will iterate over the return data and make a GET request to wiki API for each person returned
  btn.addEventListener('click', () => {
    // Once parent operations are complete this executes
    // This callback is now receiving JSON data passed to it from its parent func getJSON
    // parameter 'json' represents our data
    getJSON(astrosUrl, (json) => {
    // here is the map interation method on json.people
    // map callback will take paremeter person to represent each person object in the array
      json.people.map( person => {
    // inside map callback, call 'getJSON' and pass URL to wikipedia endpoint as first argument
    // that URL is stored as string in the variable wiki url
    // then concatenate value of a person objects name property on each interation with '+ person.name'
    // Now we pass onto generateHTML using a callback. 'generateHTML'
        getJSON(wikiUrl + person.name, generateHTML);
    });
  });
});
