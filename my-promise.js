'use strict';
var promiseCount = 0;
var log;

function testPromise() {
    var thisPromiseCount = ++promiseCount;

    log = document.getElementById('log');
    log.insertAdjacentHTML('beforeend', thisPromiseCount +
        ') Started (<small>Sync code started</small>)<br/>');

    // We make a new promise: we promise a numeric count of this promise,
    // starting from 1 (after waiting 3s)
    var promise = new Promise(
        // The resolver function is called with the ability to resolve or
        // reject the promise
        function(resolve, reject) {
            log.insertAdjacentHTML('beforeend', thisPromiseCount +
                ') Promise started (<small>Async code started</small>)<br/>');
            // This is only an example to create asynchronism
            window.setTimeout(
                function() {
                    // We fulfill the promise somethimes!
                    (Math.random() > 0.5) ? resolve(thisPromiseCount) : reject("[bad request]");

                }, Math.random() * 2000 + 1000);
        }
    );

    // We define what to do when the promise is resolved/fulfilled with the then() call,
    // and the catch() method defines what to do if the promise is rejected.
    promise.then(
        // Log the fulfillment value
        function(val) {
            log.insertAdjacentHTML('beforeend', val +
                ') Promise fulfilled (<small>Async code terminated</small>)<br/>');
        })
        .catch(
            // Log the rejection reason
            function(reason) {
                console.log('Handle rejected promise ('+reason+') here.');
            });

    log.insertAdjacentHTML('beforeend', thisPromiseCount +
        ') Promise made (<small>Sync code terminated</small>)<br/>');
}

window.onload = function () {

    if ("Promise" in window) {
        var btn = document.getElementById("btn");
        btn.addEventListener("click", testPromise);
    } else {
        log = document.getElementById('log');
        log.innerHTML = "Live example not available as your browser doesn't support the <code>Promise<code> interface.";
    }

}


