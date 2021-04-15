const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

function getJSON(url) {
  // 'getJSON' to return a promise using promise constructor, pass constructor a callback with resolve and reject
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if(xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        resolve(data);
      } else {
    // use error constructor to display stack trace as well as the response status text as the rejection reason with 'xhr'statusText'
    reject( Error(xhr.statusText) );
    }
  };
  // If network issues error wouldn't be provided use 'onerror' handler on xhr object
  xhr.onerror = () => reject( Error('A network error occurred') );
  xhr.send();
});
}

function getProfiles(json) {
  // capture results of map operation in a variable named profiles
  const profiles = json.people.map( person => {
    // specify return keyword since we're now returning a promise object during each iteration of map
    return getJSON(wikiUrl + person.name);
  });
  // now function returns profile
  return Promise.all(profiles);
}

// Generate the markup for each profile
function generateHTML(data) {
  data.forEach( person => {
    const section = document.createElement('section');
    peopleList.appendChild(section);
    // Check if request returns a 'standard' page from Wiki
    if (person.type === 'standard') {
      section.innerHTML = `
        <img src="${person.thumbnail ? person.thumbnail.source : ''}">
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

btn.addEventListener('click', (event) => {
  // Set the text content of the button on click with below code
  event.target.textContent = "Loading...";
  getJSON(astrosUrl)
    // we call '.then()' then pass it a reference to getProfiles
    .then(getProfiles)
    // logging data to console by passing a function with the parameter data, which represents the data returned by getProfiles. Once promise is fulfilled this handler function will be called asynchronously and it's going to return a value, the wiki data is JSON
    .then(generateHTML)
    //in the catch method open up a set of curly braces since we're going to pass multiple lines of code
    // set innerHTML of the main peopleList div to display h3 with text
    .catch( err => {
      peopleList.innerHTML = '<h3>Something went wrong!</h3>';
      console.log(err)
    })
    //then chain the finally method to the end of the promise sequence
    // Finally takes a func that i scalled when the promise is settled
  // next pass code that removes button from page 'event.target.remove()'
    .finally( () => event.target.remove() )
  });
