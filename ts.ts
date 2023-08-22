var _ = require('underscore');

let a = 10;
// console.log(_.identity(a));

// console.log(_.filter([true, 0, 10, 'a', false, null], _.identity));

// console.log(_.some([0, null, 2]));
// console.log(_.some([0, null, false]));

// console.log(_.every([0, null, 2]));
// console.log(_.every([{}, true, 2]));

_.every = function(list) {
    return _.filter(list, _.identity).length === list.length;
};

function not(v) { return v; }
function beq(a) {
    return function(b) {
        return a === b;
    }
}
console.time("1");
for (var i = 0; i < 10000; i++) {
    _.every([0, null, 2, 5, 0, null, 2, 5, 0, null, 2, 5, 0, null, 2, 5, 0, null, 2, 5, 0, null, 2, 5]);
}
console.timeEnd("1");

_.some = function(list) {
    return !!_.find(list, _.identity);
};

var every2 = function(list) {
    return beq(-1)(_.findIndex(list, not));
};

console.time("2");
for (var i = 0; i < 10000; i++) {
    every2([0, null, 2, 5, 0, null, 2, 5, 0, null, 2, 5, 0, null, 2, 5, 0, null, 2, 5, 0, null, 2, 5]);
}
console.timeEnd("2");

function positive(list) {
    return _.find(list, _.identity);
}

function negativeIndex(list) {
    return _.findIndex(list, not);
}

_.some = _.compose(not, not, positive);
_.every = _.compose(beq(-1), negativeIndex);

function callAndAdd(a, b) {
    return a() + b();
}

console.log(callAndAdd( () => 10, () => 5));

function add5(a) {
    return a + 5;
}
function add10(a) {
    return a + 10;
}