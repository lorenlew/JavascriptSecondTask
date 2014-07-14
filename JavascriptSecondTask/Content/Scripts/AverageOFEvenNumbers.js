function applyHandlersToObjects(list, handlerFunction) {
    return handlerFunction.call(null, list);
}

function getAverageOfEvenNumbers(list) {
    var sum = 0;
    var counter = 0;
    var averageValue = 0;
    for (var i = 0; i < list.length; i += 2) {
        counter += 1;
        sum += list[i];
    }
    averageValue = sum / counter;
    return averageValue;
}
console.log(applyHandlersToObjects([1, 2, 3, 4, 5, 6, 7, 8, 9], getAverageOfEvenNumbers));