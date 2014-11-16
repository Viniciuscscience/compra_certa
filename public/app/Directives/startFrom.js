//We already have a limitTo filter built-in to angular,
//So, here we have a startFrom filter, n the stores will be listed from a start to a limit
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    };
});