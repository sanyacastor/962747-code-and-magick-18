'use strict';

(function () {

  function load(onLoad, onError) {

    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/code-and-magick/data';
    xhr.responseType = 'json';
    xhr.timeout = 1000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', URL);
    xhr.send();
  }

  function save(formData, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/code-and-magick';
    xhr.timeout = 1000;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('POST', URL);
    xhr.send(formData);
  }

  function errorHandler(err) {
    var fragment = document.createElement('div');
    fragment.style = 'z-index: 99; margin: 0, auto; padding: 20px; width: 100%; background-color: coral; text-align:center;';
    fragment.style.position = 'absolute';
    fragment.style.top = '0';
    fragment.textContent = err;
    document.querySelector('body').appendChild(fragment);

    setTimeout(function () {
      fragment.style.display = 'none';
    }, 3000);

  }

  window.backend = {
    load: load,
    save: save,
    error: errorHandler
  };
})();
