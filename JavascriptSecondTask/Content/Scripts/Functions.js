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

    self.unfold = function (computingFunction, initialValue, boundaryValue) {
        var computedSequence = [initialValue];

        return (function callbackFunction(currentValue) {
            var nextValue = computingFunction(currentValue, boundaryValue);
            if (nextValue) {
                computedSequence.push(nextValue);
                return callbackFunction(nextValue);
            }
            return computedSequence;
        }(initialValue));
    };

    self.getDoubleValue = function (currentValue, boundaryValue) {
        return currentValue < boundaryValue ? currentValue * 2 : false;
    };

    var unfoldResult = self.unfold(self.getDoubleValue, 8, 4000);
    console.log('functionApplication.unfold(functionApplication.getDoubleValue, 8, 4000)= ' + unfoldResult);

    self.getAverage = function (array) {
        var averageValue = self.sumRecursive(array, 0) / array.length;
        return averageValue;
    };

    var averageOfEvenNumbersResult = self.getAverage(self.find([1, 3, 8, 15, 24, 38], self.isEven));
    console.log('functionApplication.getAverage(functionApplication.find([1, 3, 8, 15, 24, 38]' +
        ', functionApplication.isEven)) = ' + averageOfEvenNumbersResult);

    self.getSumOfRandomNumbers = function (amount) {
        var arrayOfRandomNumbers = [];
        var i;
        for (i = 0; i < amount; i += 1) {
            arrayOfRandomNumbers.push(Math.random() * 100);
        }
        var sumOfRandomNumbers = self.sumRecursive(arrayOfRandomNumbers, 0);
        return sumOfRandomNumbers;
    };

    var sumOfRandomNumbersResult = self.getSumOfRandomNumbers(10);
    console.log('functionApplication.getSumOfRandomNumbers(10) = ' + sumOfRandomNumbersResult);

    self.firstSatisfying = function (array, isMatching) {
        var arrayOfMatchingValues = self.find(array, isMatching);
        var firstMatching = self.first(arrayOfMatchingValues);
        return firstMatching;
    };
    var firstMatchingResult = self.firstSatisfying([1, 3, 15, 23, 100], self.shareOnFive);
    console.log('functionApplication.firstSatisfying([1, 3, 15, 23, 100], ' +
        'functionApplication.shareOnFive) = ' + firstMatchingResult);

    self.lazy = function (handler) {
        var parameters = Array.prototype.slice.call(arguments, 1);
        var lazyEvaluatedFunction = function () {
            return handler.apply(null, parameters);
        };
        return lazyEvaluatedFunction;
    };

    var lazyFunction = self.lazy(self.sumAll, 1, 5, 13);
    var lazyFunctionResult = lazyFunction();
    console.log('functionApplication.lazy(functionApplication.sumAll, 1, 5, 13 )()= ' + lazyFunctionResult);

    self.generateFibonacciNumbers = function (a, b) {
        var c = a + b;
        return {
            current: c,
            reInitializeFib: function () {
                return self.generateFibonacciNumbers(b, c);
            }
        };
    };

    self.getFibonacciNumbers = function (fibInitial, amount) {
        var fibNumbersArray = [];
        var fibNumbersGenerator = fibInitial;
        var i;
        for (i = 0; i < amount; i++) {
            fibNumbersArray.push(fibNumbersGenerator.current);
            fibNumbersGenerator = fibNumbersGenerator.reInitializeFib();
        }
        return fibNumbersArray;
    };

    var fibNumbersResult = self.getFibonacciNumbers(self.generateFibonacciNumbers(1, 1), 10);
    console.log('functionApplication.getFibonacciNumbers(functionApplication.generateFibonacciNumbers(1, 1), 10)' +
        '= ' + fibNumbersResult);

    self.getFuncName = function (callback) {
        var name = callback.toString();
        var reg = /function ([^\(]*)/;
        return reg.exec(name)[1];
    };

    self.memoize = function (func) {
        var cache = window.cache || {};
        var funcName = [self.getFuncName(func)];
        return function () {
            var allArguments = Array.prototype.slice.call(arguments);
            if (self.isEmpty(allArguments)) {
                throw Error('No argument provided');
            }
            var funcHash = funcName.concat(allArguments);
            if (!cache[funcHash]) {
                var functionResult = func.apply(this, Array.prototype.slice.call(allArguments));
                if (isNaN(functionResult)) {
                    throw Error('NaN result');
                }
                cache[funcHash] = functionResult;
            }
            return cache[funcHash];
        };
    };
    self.getFibonacciNumber = function (num) {
        return (num < 2) ? num : self.getFibonacciNumber(num - 1) + self.getFibonacciNumber(num - 2);
    };

    self.getFibonacciNumber(4);
    self.memoizeFib = self.memoize(self.getFibonacciNumber);
    console.log('functionApplication.memoizeFib(4)= ', self.memoizeFib(4));
    console.log('functionApplication.memoizeFib(5)= ', self.memoizeFib(5));
    console.log('functionApplication.memoizeFib(6)= ', self.memoizeFib(6));
    console.log('functionApplication.memoizeFib(7)= ', self.memoizeFib(7));

}(window.functionApplication = window.functionApplication || {}));