var curryApplication = new function () {

    'use strict';

    this.curry = function (functionToBeCurried) {

        var numberOfExplicitParameters = functionToBeCurried.length;

        function getCurriedFunction(previousArguments) {
            return function (currentArgument)
            {
                if (typeof currentArgument === 'undefined') {
                    currentArgument = 0;
                }
                var allArguments = previousArguments.concat(currentArgument);
                if (allArguments.length < numberOfExplicitParameters) {
                    return getCurriedFunction(allArguments);
                } else {
                    return functionToBeCurried.apply(this, allArguments);
                }
            };
        }
        return getCurriedFunction([]);
    }

    this.sum = function (argument1, argument2, argument3, argument4) {
        var totalSum = argument1 + argument2 + argument3 + argument4;
        return totalSum;
    }

    this.sumWithCurry = this.curry(this.sum);

    var result = this.sumWithCurry(1)(3)(5)(2);

    console.log('curryApplication.sumWithCurry(1)(3)(5)(2) = ' + result);
};