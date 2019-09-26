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

function generateWizard() {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = getRandom(NAMES) + ' ' + getRandom(SURNAMES);
  wizardElement.querySelector('.wizard-coat').style.fill = getRandom(COAT_COLORS);
  wizardElement.querySelector('.wizard-eyes').style.fill = getRandom(EYES_COLORS);

  return wizardElement;
}

function getRandomWizzardsArray(n) {

  var wizardArr = [];

  for (var i = 0; i < n; i++) {
    wizardArr.push(generateWizard());
  }

  return wizardArr;
}

function renderWizzardsArray(arr) {
  for (var i = 0; i < arr.length; i++) {
    similarListElement.appendChild(arr[i]);
  }
}

var wizards = getRandomWizzardsArray(4);
renderWizzardsArray(wizards);


