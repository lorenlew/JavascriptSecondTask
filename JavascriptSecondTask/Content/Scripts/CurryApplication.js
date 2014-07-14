(function curryApplication() {
    'use strict';

    var __map = [].map;

    function applyHandlerToObject(list, unaryFunc) {
        return __map.call(list, unaryFunc);
    }

    function curry(binaryFunc) {
        return function(secondArg) {
            return function(firstArg) {
                return binaryFunc(firstArg, secondArg);
            };
        };
    }

    function square(n) {
        return n * n;
    }

    var curriedMap = curry(applyHandlerToObject);
    curryApplication.squareAllWithCurry = curriedMap(square);

    console.log("squareAllWithCurry - " + curryApplication.squareAllWithCurry([1, 2, 3, 4, 6]));
})();