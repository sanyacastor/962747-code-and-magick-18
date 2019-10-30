'use strict';

(function () {

  var similarList = document.querySelector('.setup-similar');
  similarList.classList.remove('hidden');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');


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
    arr.slice(0, 4).forEach(function (item) {
      fragment.appendChild(getWizardDomElement(item));
    });

    similarListElement.appendChild(fragment);
  }


  window.render = {
    generateWizards: generateWizards
  };
})();
