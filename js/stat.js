'use strict';

window.renderStatistics = function (ctx, names, times) {

  var TABLE_WIDTH = 420;
  var TABLE_HEIGHT = 270;
  var TABLE_XPOS = 110;
  var TABLE_YPOS = 20;
  var TABLE_SHADOW_XPOS = 100;
  var TABLE_SHADOW_YPOS = 10;
  var TEXT_XPOS = 120;
  var TEXT_YPOS = 40;
  var TEXT_LINE_HEIGHT = 20;
  var USERNAME_XPOS = 260;
  var TIME_XPOS = 230;
  var HISTOGRAM_MAX_HEIGHT = 150;
  var HISTOGRAM_WIDTH = 40;
  var HISTOGRAM_GAP = 90;
  var HISTOGRAM_XPOS = 240;

  function drawTable() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(TABLE_XPOS, TABLE_YPOS, TABLE_WIDTH, TABLE_HEIGHT);

    ctx.fillStyle = '#fff';
    ctx.fillRect(TABLE_SHADOW_XPOS, TABLE_SHADOW_YPOS, TABLE_WIDTH, TABLE_HEIGHT);

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Sans';
    ctx.fillText('Ура вы победили!', TEXT_XPOS, TEXT_YPOS);
    ctx.fillText('Список результатов:', TEXT_XPOS, TEXT_YPOS + TEXT_LINE_HEIGHT);
  }

  function getMaxItem(items) {
    var max = items[0];
    for (var i = 0; i <= items.length; i++) {
      if (items[i] > max) {
        max = items[i];
      }
    }
    return max;
  }

  function drawhistogram(users, scores, maxtime) {
    var histogramStartPoint = 150;

    for (var i = 0; i < scores.length; i++) {

      var histogramHeight = (scores[i] * HISTOGRAM_MAX_HEIGHT / maxtime).toFixed(0);
      var rnd = (Math.random() * 100).toFixed(0) + '%';

      ctx.fillStyle = (users[i] === 'Вы') ? 'red' : 'hsl(237, 100%,' + rnd + ')';

      ctx.fillRect(histogramStartPoint, HISTOGRAM_XPOS - histogramHeight, HISTOGRAM_WIDTH, histogramHeight);

      ctx.fillStyle = '#000';
      ctx.fillText(users[i], histogramStartPoint, USERNAME_XPOS);
      ctx.fillText(scores[i].toFixed(0), histogramStartPoint, TIME_XPOS - histogramHeight);

      histogramStartPoint += HISTOGRAM_GAP;
    }
  }

  drawTable();
  var maxTime = getMaxItem(times);
  drawhistogram(names, times, maxTime);

};

