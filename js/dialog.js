'use strict';
(function () {

  var setupElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = setupElement.querySelector('.setup-close');

  function onDialogEscPress(evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      hideDialog();
    }
  }

  function resetElPosition(el) {
    el.style.top = '';
    el.style.left = '';
  }

  function showDialog() {
    setupElement.classList.remove('hidden');
    document.addEventListener('keydown', onDialogEscPress);
  }

  function hideDialog() {
    setupElement.classList.add('hidden');
    document.removeEventListener('keydown', onDialogEscPress);
    resetElPosition(setupElement);
  }

  setupOpenElement.addEventListener('click', function () {
    showDialog();
  });

  setupCloseElement.addEventListener('click', hideDialog);

  setupOpenElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      showDialog();
    }
  });

  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clckevt) {
          clckevt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
