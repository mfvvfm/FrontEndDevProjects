function add(a, b, callback) {
  callback(a + b);
}

add(2, 4, function(sum) {
  console.log(sum); // 6
});

/*
A callback function is a function passed into another function as an argument.
The function that receives the callback function is often referred to as the "parent" function.
The parent function will, at some point in the future, execute or call the callback.

For example, the add function below accepts a function as its third argument (via the parameter callback).
When add is invoked, the function passed to it logs the sum of the values passed in for a and b.
*/
