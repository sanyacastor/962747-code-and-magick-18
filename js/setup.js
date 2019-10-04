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
