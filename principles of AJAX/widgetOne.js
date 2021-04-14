var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
      var employees = JSON.parse(xhr.responseText);
      // JSON.parse takes a string and converts into JS obj
      // Text response from server is JSON formatted string from employees.json file
    console.log(employees);
  }
};
xhr.open('GET', 'data/employees.json');
xhr.send();
