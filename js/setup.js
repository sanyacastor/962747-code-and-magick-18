'use strict';

(function () {

  var wizardSetup = document.querySelector('.setup-player');
  var wizardCoatColor = wizardSetup.querySelector('.wizard-coat');
  var wizardEyesColor = wizardSetup.querySelector('.wizard-eyes');
  var wizardFireballColor = wizardSetup.querySelector('.setup-fireball-wrap');

  var coatColorInput = document.querySelector('input[name="coat-color"]');
  var eyesColorInput = document.querySelector('input[name="eyes-color"]');
  var fireballColorInput = document.querySelector('input[name="fireball-color"]');

  var similarList = document.querySelector('.setup-similar');
  similarList.classList.remove('hidden');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  wizardCoatColor.addEventListener('click', function () {
    getRandomCoatColor(window.util.COAT_COLORS);
  });
  wizardEyesColor.addEventListener('click', function () {
    getRandomEyesColor(window.util.EYES_COLORS);
  });
  wizardFireballColor.addEventListener('click', function () {
    getRandomFireballColor(window.util.FIREBALL_COLORS);
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

  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getRandomWizard() {
    return {
      name: getRandom(window.util.NAMES) + ' ' + getRandom(window.util.SURNAMES),
      eyes: getRandom(window.util.EYES_COLORS),
      coat: getRandom(window.util.COAT_COLORS)
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
})();
