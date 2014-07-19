(function (functionApplication) {

    'use strict';

    functionApplication.curry = function (functionToBeCurried) {

        var numberOfExplicitParameters = functionToBeCurried.length;

        function getCurriedFunction(previousArguments) {
            return function (currentArgument) {
                if (currentArgument === undefined) {
                    currentArgument = 0;
                }
                var allArguments = previousArguments.concat(currentArgument);
                if (allArguments.length < numberOfExplicitParameters) {
                    return getCurriedFunction(allArguments);
                }
                return functionToBeCurried.apply(null, allArguments);
            };
        }

        return getCurriedFunction([]);
    };

    functionApplication.sum = function sum(argument1, argument2, argument3, argument4) {
        var totalSum = argument1 + argument2 + argument3 + argument4;
        return totalSum;
    };

    functionApplication.curriedSum = functionApplication.curry(functionApplication.sum);
    var curryResult = functionApplication.curriedSum(1)(3)(5)(2);
    console.log('functionApplication.curriedSum(1)(3)(5)(2) = ' + curryResult);

    functionApplication.partial = function (handler) {
        var slice = Array.prototype.slice;
        var highOrderArguments = slice.call(arguments, 1);

        return function () {
            var lowOrderArguments = slice.call(arguments, 0);
            var allArguments = highOrderArguments.concat(lowOrderArguments);
            return handler.apply(null, allArguments);
        };
    };

    functionApplication.sumAll = function sumAll() {
        var totalSum = 0;
        var i;
        for (i = 0; i < arguments.length; i += 1) {
            totalSum += arguments[i];
        }
        return totalSum;
    };

    functionApplication.partialSum = functionApplication.partial(functionApplication.sumAll, 1, 2, 3);
    var partialResult = functionApplication.partialSum(4, 5);
    console.log('functionApplication.partialSum(4, 5) = ' +
        'functionApplication.partial(functionApplication.sumAll, 1, 2, 3)(4, 5) = ' + partialResult);

}(window.functionApplication = window.functionApplication || {}));