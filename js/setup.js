'use strict';

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'];

var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'];

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupElement = document.querySelector('.setup');
var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = setupElement.querySelector('.setup-close');

function onDialogEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
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
  if (evt.keyCode === ENTER_KEYCODE) {
    showDialog();
  }
});

var wizardSetup = document.querySelector('.setup-player');
var wizardCoatColor = wizardSetup.querySelector('.wizard-coat');
var wizardEyesColor = wizardSetup.querySelector('.wizard-eyes');
var wizardFireballColor = wizardSetup.querySelector('.setup-fireball-wrap');

var coatColorInput = document.querySelector('input[name="coat-color"]');
var eyesColorInput = document.querySelector('input[name="eyes-color"]');
var fireballColorInput = document.querySelector('input[name="fireball-color"]');

wizardCoatColor.addEventListener('click', function () {
  getRandomCoatColor(COAT_COLORS);
});
wizardEyesColor.addEventListener('click', function () {
  getRandomEyesColor(EYES_COLORS);
});
wizardFireballColor.addEventListener('click', function () {
  getRandomFireballColor(FIREBALL_COLORS);
});

function getRandomEyesColor(arr) {
  wizardEyesColor.style.fill = eyesColorInput.value = getRandom(arr);
}
function getRandomCoatColor(arr) {
  wizardCoatColor.style.fill = coatColorInput.value = getRandom(arr);
}
function getRandomFireballColor(arr) {
  wizardFireballColor.style.background = fireballColorInput.value = getRandom(arr);
}

var similarList = document.querySelector('.setup-similar');
similarList.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomWizard() {
  return {
    name: getRandom(NAMES) + ' ' + getRandom(SURNAMES),
    eyes: getRandom(EYES_COLORS),
    coat: getRandom(COAT_COLORS)
  };
}

function generateData(count) {
  var data = [];
  for (var i = 0; i < count; i++) {
    data[i] = getRandomWizard();
  }
  return data;
}

function getWizardDomElement(wizard) {

  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coat;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyes;

  return wizardElement;
}

function renderWizards(arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var element = getWizardDomElement(arr[i]);
    fragment.appendChild(element);
  }

  return fragment;
}

var data = generateData(4);
var fragment = renderWizards(data);
similarListElement.appendChild(fragment);


(function () {

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
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
