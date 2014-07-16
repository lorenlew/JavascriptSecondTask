!function ()
{
    function partial(handler)
    {
        var slice = Array.prototype.slice;
        var highOrderArguments = slice.call(arguments, 1);

        return function ()
        {
            var lowOrderArguments = slice.call(arguments, 0);
            var allArguments = highOrderArguments.concat(lowOrderArguments);
            return handler.apply(this, allArguments);
        };
    }

    function sum()
    {
        var totalSum = 0;
        for (var i = 0; i < arguments.length; i++) {
            totalSum += arguments[i];
        }
        return totalSum;
    }

    var result = partial(sum, 1, 2, 3)(4, 5);
    console.log('partial(sum, 1, 2, 3)(4, 5) = ' + result);
}()
