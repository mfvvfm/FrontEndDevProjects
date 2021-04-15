function add(x, y, callback) {
// The x will be 5 and y will be 10 so sum will be 15
// The sum value will be forwarded to callback and in callback we're calling subtract
  callback(x + y)
}
function subtract(x, y, callback) {
// The x will be 15 and y will be 2 so subtraction will be 13
// The subtracted value will be forwarded to callback and in callback we're calling multiply
  callback(x - y);
}
function multiply(x, y, callback) {
// The x will be 13 and y will be 5 so product will be 65
// The product value will be forwarded to callback and the n will be 65
  callback(x * y);
}
function calculate(x, callback) {
 // The x will be 5
 //Value of 5 will be forwarded to callback & in callback we're calling add with 5
  callback(x);
}

calculate(5, (n) => {
  add(n, 10, (n) => {
    subtract(n, 2, (n) => {
      multiply(n, 5, (n) => {
        console.log(n); // 65
      });
    });
  });
});

/*
With callbacks, you can also create a chain of function calls (or a sequence of tasks) where one task
runs after another is completed. This is referred to as continuation-passing style (CPS).
*/
