'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  ctx.fillStyle = '#fff';
  ctx.fillRect(100, 10, 420, 270);

  ctx.font = '16px PT Sans';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var maxTime = 0;

  for (var i = 0; i <= times.length; i++) {
    if (times[i] > maxTime) {
      maxTime = times[i];
    }
  }

  var xStartPoint = 150;

  for (i = 0; i < times.length; i++) {

    var score = (times[i] * 150 / maxTime).toFixed(0);
    var rnd = (Math.random() * 100).toFixed(0) + '%';

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'red';
      ctx.fillRect(xStartPoint, 240 - score, 40, score);
    } else {
      ctx.fillStyle = 'hsl(237, 100%,' + rnd + ')';
      ctx.fillRect(xStartPoint, 240 - score, 40, score);
    }

    ctx.font = '16px PT Sans';
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], xStartPoint, 260);

    ctx.font = '16px PT Sans';
    ctx.fillStyle = '#000';
    ctx.fillText(times[i].toFixed(0), xStartPoint, 230 - score);

    xStartPoint += 90;
  }

};

