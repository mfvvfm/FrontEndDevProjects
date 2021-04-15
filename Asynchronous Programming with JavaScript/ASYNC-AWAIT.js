const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// Handle all fetch requests
  // 7. create try catch function
  async function getJSON(url) {
    // below will contain all the code tha tneeds to be executed
    try {
      // below is the data fetching statements, initialise a variable named response whose value awaits the promise returned by fetch passing it 'url'
      const response = await fetch(url);
      // then return await response.json, means that the function will wait for 'response.json' to resolve or reject
      return await response.json();
    // any code inside catch will be executed if an exception is thrown in the try block, error represent the error object
    } catch (error) {
      throw error;
    }
  }

// 1. declare async func named below, this function will first make a fetch request to open notify API then use results to make fetch requests to the wikipeadie API
async function getPeopleInSpace(url) {
  //in body of func, start by making the first network request using fetch method, it will be to the open notify API to get names of the people and space, declare variable named peopleResponse to capture the value returned from fetch passing it URL as its argument
 // fetch returns a promise keyword 'await' is used to handle the promise
  // await keyword is going to wait for a resolved promise returned by fetch
  // then it's going to get fulfillment value out of the promise and assign it to peopleResponse
  // 8. no longer going to call fetch instead we'll call getJSON function, delete var 'const peopleResponse = await fetch(url);'

  // parse response from fetch to json
  // once again we'll await the JSON data by including await in front of peopleResponse.json
  // 8.1 set value of peopleJSON to await getJSON passing it the url to fetch
  const peopleJSON = await getJSON(url);

  // 2. Continue by making next set of network requests, we'll map over array of objects stored in peopleJSON and fetch data from the wiki API based on the return names of people in space
  // we want to iterate over the people property of each JSON object
  // so we set const profiles to peopleJSON.people.map();
  // map callback will take the parameter person to represent each person in space
  const profiles = peopleJSON.people.map( async (person) => {
    // 4. to display each aircraft each astronaut is on save it in var called craft
    const craft = person.craft;
    // 3. declare var named profileRes that awaits response object from fetch, passing wikipedia URL which is stored in wikiURL
    // then we concantenate the value of a person object's name property on each iteration with '+ person.name'
    // 9. also delete '    const profileResponse = await fetch(wikiUrl + person.name);'
    // after that declare a variable named profileJSON. here we await a resolved promise from 'profileResponse.json'
    // Any code that calls 'await' needs to be wrapped in an async func
    // 10. set 'profileJSON' to 'await getJSON;', passing it 'wikiUrl + person.name'
    const profileJSON = await getJSON(wikiUrl + person.name);

  // 4.1 then we combine craft data with astronaut profiles data by returning an object, inside obj use spread operator to copy all the properties from the profileJSON obj onto this new obj
  // along with the craft property value
  return {...profileJSON, craft}
  });

  // 5. Now use 'promise.all' to wait on all of those individual promises then join them into a single promise that gets resolved when all are fulfilled
  // The value of 'Promise.all()' is the result of each of the map calls, so the func is going to wait for the aggregated promise to be resolved into a single promise before it returns all data

return Promise.all(profiles);
}

// Generate the markup for each profile
function generateHTML(data) {
  data.map( person => {
    const section = document.createElement('section');
    peopleList.appendChild(section);
    // Check if request returns a 'standard' page from Wiki
    if (person.type === 'standard') {
      section.innerHTML = `
        <img src=${person.thumbnail.source}>
        <span>${person.craft}</span>
        <h2>${person.title}</h2>
        <p>${person.description}</p>
        <p>${person.extract}</p>
      `;
    } else {
      section.innerHTML = `
        <img src="img/profile.jpg" alt="ocean clouds seen from space">
        <h2>${person.title}</h2>
        <p>Results unavailable for ${person.title}</p>
        ${person.extract_html}
      `;
    }
  });
}
  // 6.1 make func async by adding it in front of addEventListner's callback
btn.addEventListener('click', async (event) => {
  event.target.textContent = "Loading...";

  // 6. Call the getPeopleInSpace func and pass returned promise to the generateHTML func
  // declare var astros which will store the results of getPeopleInSpace passing it the open notify API end point stored in the variable astrosUrl
  // since getPeopleInSpace returns a promise you need to await result of promise by indcluding the await keyword in front of it

  const astros = await getPeopleInSpace(astrosUrl);
  // now we can invoke generateHTML and pass it the value of astros
  generateHTML(astros);
  //remove button once data loads
  event.target.remove();
});
