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
  // event added to remove button on click
  btn.addEventListener('click', (event) => {
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
    // removes event button
    event.target.remove();
});

/*Previous videos explained what asynchronous code, callbacks, and the call stack are. A video in the teacher's notes explained what the event loop is. So in this video Guil baffled me by using Chrome's debugger to synchronously step through asynchronous code with accompanying weird call stack behaviour. Here are the explanations and solutions I came up with to understand this part.

1. To debug in Chrome Guil uses the "step into" button (F11) instead of the "step" button (F9). This causes the Chrome debugger to simulate stepping trough the asynchronous code "synchronously". For instance, notice how the generateHTML function immediately gets called for the first astronaut, instead of after all the astronaut data requests are posted. Guil partially hides this by by using "step over" for the last steps. Also notice how the xhr.send(); line never gets called, because the debugger miraculously immediatly steps into the callback function. When I used "step" instead of "step into", and after my next point, the debugger and call stack (and the implied callback queue) began to behave asynchronously as the previous lessons had explained.

2. Notice how the call stack even shows functions that have finished? If a function does an XHR request, I would expect that that function must finish and the call stack be empty before the next callback function can be handled. However we see such functions seemingly remain on or reenter the call stack. This seems to be a trick that Chrome DevTools uses to also show us the stack of functions that created the callback function. I can see why this can be very helpful if you know why these imaginary call stack functions are there. This call stack behaviour for async functions is default turned on. You can toggle this behaviour in DevTools in Settings (the wheel icon, F1), scroll down a bit, and then under Debugger, Disable async stack traces (on/off).

3. The example code is riddled with anonymous functions. The call stack shows "anonymous" with a line number to indicate which one. That in itself made learning to debug code harder to understand, especially with the above issues. So just this once (I hope), for the educational purpose of wrapping my head around how the debugger works for asynchronous callback functions, I rewrote the code of callback.js. I duplicated the getJSON function to differentiate its two usages, and I named all anynymous functions with very explicit names. Debugging that explicit code helped me to better understand the different kinds of stepping and the two kinds of call stack for async functions.

*/
