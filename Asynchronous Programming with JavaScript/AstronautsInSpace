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
function getJSON(url) {
  // getJSON function initialises an XMLHttpRequest
  const xhr = new XMLHttpRequest();
  // then getJSON func gets browser ready to make a GET request to        the provided URL
  xhr.open('GET', url);
  // 4. XHR request also accepts a callback so as soon as the server sends back its response it runs the callback func assigned to the 'onload' event. In this case it is checking the server response readystate and status then parsing response text to JSON & logging data to console. Anytime the request changes this callback function is going to fire and update the data
  xhr.onload = () => {
    if(xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      console.log(data);
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
  btn.addEventListener('click', () => getJSON(astrosUrl));
