'use strict';

(function () {
  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  window.random = {
    get: getRandom
  };
})();
