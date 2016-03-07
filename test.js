//test array spread support
let a = [1,2,3,4];
let b = [5,6,7,8];
console.log([...a, ...b]); // [ 1, 2, 3, 4, 5, 6, 7, 8 ]

//test object spread support
let c = {a:'foo'};
let d = {b:'bar'};
let e = {...c, ...d};
console.log(e); // { a: 'foo', b: 'bar' }
