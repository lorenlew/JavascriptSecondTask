var partialApplication = new function () {

    'use strict';

    this.partial = function (handler) {
        var slice = Array.prototype.slice;
        var highOrderArguments = slice.call(arguments, 1);

        return function () {
            var lowOrderArguments = slice.call(arguments, 0);
            var allArguments = highOrderArguments.concat(lowOrderArguments);
            return handler.apply(this, allArguments);
        };
    }

    this.sum = function () {
        var totalSum = 0;
        for (var i = 0; i < arguments.length; i++) {
            totalSum += arguments[i];
        }
        return totalSum;
    }

    this.sumWithPartial = this.partial(this.sum, 1, 2, 3);

    var result = this.sumWithPartial(4, 5);

    console.log('partialApplication.sumWithPartial(4, 5) = partialApplication.partial(this.sum, 1, 2, 3)(4, 5) = ' + result);
};
