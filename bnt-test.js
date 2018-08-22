const bnt = require("./bnt");

console.log(bnt`-2`);
console.log(bnt`(-2)`);
console.log(bnt`sqrt(2 + sqrt(4))`);
console.log(bnt`1 * ${1} + 4 / 2 == 3`);
//
console.log(bnt`1 * (${100} + 4) / 2`);


console.log(bnt(`2`)());
console.log(bnt(`2 + $a`)({a:1}));
console.log(bnt(`2 * ($a + 1)`)({a:1}));
console.log(bnt(`sqrt(2 + sqrt(4))`)());
console.log(bnt(`1 * $a + 4 / 2 == 3`)({a:1}));
console.log(bnt(`1 * ($a + 4) / 2`)({a: 100}));
//
