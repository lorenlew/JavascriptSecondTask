(function (functionApplication) {

    'use strict';
    var self = functionApplication;
    self.curry = function (functionToBeCurried) {

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

    self.sum = function sum(argument1, argument2, argument3, argument4) {
        var totalSum = argument1 + argument2 + argument3 + argument4;
        return totalSum;
    };

    self.curriedSum = self.curry(self.sum);
    var curryResult = self.curriedSum(1)(3)(5)(2);
    console.log('functionApplication.curriedSum(1)(3)(5)(2) = ' + curryResult);

    self.partial = function (handler) {
        var slice = Array.prototype.slice;
        var highOrderArguments = slice.call(arguments, 1);

        return function () {
            var lowOrderArguments = slice.call(arguments, 0);
            var allArguments = highOrderArguments.concat(lowOrderArguments);
            return handler.apply(null, allArguments);
        };
    };

    self.sumAll = function sumAll() {
        var totalSum = 0;
        var i;
        for (i = 0; i < arguments.length; i += 1) {
            totalSum += arguments[i];
        }
        return totalSum;
    };

    self.partialSum = self.partial(self.sumAll, 1, 2, 3);
    var partialResult = self.partialSum(4, 5);
    console.log('functionApplication.partialSum(4, 5) = ' +
        'functionApplication.partial(functionApplication.sumAll, 1, 2, 3)(4, 5) = ' + partialResult);


    self.first = function (array) {
        return array[0];
    };

    self.rest = function (array) {
        return array.slice(1);
    };

    self.isEmpty = function (array) {
        return array.length === 0;
    };

    self.map = function (array, handler) {
        if (self.isEmpty(array)) {
            return array;
        }
        return [handler(self.first(array))].concat(self.rest(array).map(handler));
    };

    self.square = function (i) {
        return i * i;
    };
    var mapSquareResult = self.map([1, 2, 3, 4, 5], self.square);
    console.log('functionApplication.map([1, 2, 3, 4, 5], functionApplication.square) = ' + mapSquareResult);


    self.find = function (array, isMatching) {
        var matches = [];
        var i;
        for (i = 0; i < array.length; i++) {
            if (isMatching(array[i])) {
                matches.push(array[i]);
            }
        }
        return matches;
    };

    self.shareOnFive = function (i) {
        return i % 5 === 0;
    };
    var findResult = self.find([1, 3, 5, 15, 23, 100], self.shareOnFive);
    console.log('functionApplication.find([1, 3, 5, 15, 23, 100], functionApplication.shareOnFive) = ' + findResult);

    self.isEven = function (i) {
        return i % 2 === 0;
    };

    self.add = function (a, b) {
        return a + b;
    };

    self.foldRecursive = function (array, combineFunction, initialValue) {
        if (self.isEmpty(array)) {
            return initialValue;
        }
        return combineFunction(self.first(array), self.foldRecursive(self.rest(array), combineFunction, initialValue));
    };

    self.sumRecursive = function (array, initialValue) {
        return self.foldRecursive(array, self.add, initialValue);
    };

    var foldSumResult = self.sumRecursive([1, 3, 5, 15, 23, 100], 0);
    console.log('functionApplication.sumRecursive([1, 3, 5, 15, 23, 100], 0) = ' + foldSumResult);

    self.getAverage = function (array) {
        var averageValue = self.sumRecursive(array, 0) / array.length;
        return averageValue;
    };

    var averageOfEvenNumbersResult = self.getAverage(self.find([1, 3, 8, 15, 24, 38], self.isEven));
    console.log('functionApplication.getAverage(functionApplication.find([1, 3, 8, 15, 24, 38]' +
        ', functionApplication.isEven)) = ' + averageOfEvenNumbersResult);

    self.getSumOfRandomNumbers = function (amount) {
        var randomArray = [];
        var i;
        for (i = 0; i < amount; i += 1) {
            randomArray.push(Math.random() * 100);
        }
        var sumOfRandomNumbers = self.sumRecursive(randomArray, 0);
        return sumOfRandomNumbers;
    };

    var sumOfRandomNumbersResult = self.getSumOfRandomNumbers(10);
    console.log('functionApplication.getSumOfRandomNumbers(10) = ' + sumOfRandomNumbersResult);

}(window.functionApplication = window.functionApplication || {}));