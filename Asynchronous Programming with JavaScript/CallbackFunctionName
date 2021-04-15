function getUserName(callback) {
  const name = prompt('What is your name?');
  callback(name);
}

function greeting(name) {
  alert('Hello, ' + name);
}

getUserName(greeting); // a reference to the greeting function is passed to the function

/*
In the following example, the function getUserName accepts a function as an argument
(via the parameter callback). The greeting function passed to getUserName is invoked after prompt()
captures a name and stores it in the variable name.
*/
