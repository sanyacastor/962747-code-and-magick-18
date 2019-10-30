'use strict';

(function () {

  var wizards = [];
  var eyesColor = '';
  var coatColor = '';

  var wizardSetup = document.querySelector('.setup-player');
  var wizardCoatColor = wizardSetup.querySelector('.wizard-coat');
  var wizardEyesColor = wizardSetup.querySelector('.wizard-eyes');
  var fireballColorInput = document.querySelector('input[name="fireball-color"]');
  var wizardFireballColor = wizardSetup.querySelector('.setup-fireball-wrap');


  wizardCoatColor.addEventListener('click', function () {
    var newColor = window.random.get(window.util.COAT_COLORS);
    wizardCoatColor.style.fill = newColor;
    coatColor = newColor;
    updateWizards();
  });

  wizardEyesColor.addEventListener('click', function () {
    var newColor = window.random.get(window.util.EYES_COLORS);
    wizardEyesColor.style.fill = newColor;
    eyesColor = newColor;
    updateWizards();
  });

  wizardFireballColor.addEventListener('click', function () {
    wizardFireballColor.style.background = fireballColorInput.value = window.random.get(window.util.FIREBALL_COLORS);
  });


  function getRank(wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  }

  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  function updateWizards() {
    window.render.generateWizards(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  }

  function sucessHandler(data) {
    wizards = data;
    window.render.generateWizards(wizards);
  }

  window.backend.load(sucessHandler, window.backend.error);
})();
