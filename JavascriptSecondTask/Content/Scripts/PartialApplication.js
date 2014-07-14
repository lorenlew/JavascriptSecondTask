(function partialApplication() {
    'use strict';

    var __map = [].map;

    function applyHandlerToObject(list, unaryFunc) {
        return __map.call(list, unaryFunc);
    }

    function applyHandlerToObjectWrapper(unaryFunc) {
        return function(list) {
            return applyHandlerToObject(list, unaryFunc);
        };
    }

    function square(n) {
        return n * n;
    }

    partialApplication.squareAllWithPartial = applyHandlerToObjectWrapper(square);

    console.log("squareAllWithPartial - " + partialApplication.squareAllWithPartial([1, 2, 3, 4, 5]));
})();
