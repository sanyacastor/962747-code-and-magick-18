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

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

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

  var wizard = {
    name: '',
    eyes: '',
    coat: ''
  };

  wizard.name = getRandom(NAMES) + ' ' + getRandom(SURNAMES);
  wizard.eyeColor = getRandom(EYES_COLORS);
  wizard.coatColor = getRandom(COAT_COLORS);

  return wizard;
}

function getWizardDomElement(wizard) {

  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

function renderWizards() {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 4; i++) {
    var wizard = getRandomWizard();
    var element = getWizardDomElement(wizard);
    fragment.appendChild(element);
  }
  return fragment;
}

similarListElement.appendChild(renderWizards());
