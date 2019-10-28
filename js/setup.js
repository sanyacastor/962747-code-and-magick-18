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

  function getWizardDomElement(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  }

  function generateWizards(arr) {
    similarListElement.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      var randomWizard = getRandom(arr);
      var element = getWizardDomElement(randomWizard);
      fragment.appendChild(element);
    }
    similarListElement.appendChild(fragment);
  }

  window.setup = {
    generateWizards: generateWizards
  };
})();
