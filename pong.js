;(function(root) {
  var pong = root.Pong = (root.Pong || {});
  var game = pong.game = new Game('pong', 'pongCanvas');
  var renderer = pong.renderer = new root.twoDimensionalRenderer(pong.game.context);
  pong.shapes = [];
  pong.scores = [0, 0];
  pong.fontSize = 10;
  pong.started = false;

  pong.setup = function(context) {
    this.ball = new Circle(context.canvas.width / 2, context.canvas.height * .6, 20);
    this.playerOnePaddle = new Polygon();
    this.playerTwoPaddle = new Polygon();
    this.topWall = new Polygon();
    this.bottomWall = new Polygon();
    this.setupWall(this.topWall, true, context);
    this.setupWall(this.bottomWall, false, context);
    this.setupPaddle(this.playerOnePaddle, true, context);
    this.setupPaddle(this.playerTwoPaddle, false, context);
    this.shapes.push(pong.ball);
    this.shapes.push(pong.playerOnePaddle);
    this.shapes.push(pong.playerTwoPaddle);
    this.shapes.push(this.topWall);
    this.shapes.push(this.bottomWall);
  }; // pong.setup

  pong.setupWall = function(wall, isTop, context) {
    var playableAreaTop = context.canvas.height * .2;
    var playableAreaBottom = context.canvas.height;
    var canvasWidth = context.canvas.width;
    var wallHeight = 5;
    var startY;
    if (isTop) {
      startY = playableAreaTop;
    } else {
      startY = playableAreaBottom - wallHeight;
    }
    wall.addPoint(0, startY);
    wall.addPoint(canvasWidth, startY);
    wall.addPoint(canvasWidth, startY + wallHeight);
    wall.addPoint(0, startY + wallHeight);
  };

  pong.translatePlayableArea = function(initialWidth, initialHeight, context) {
    this.topWall.removePoints();
    this.bottomWall.removePoints();
    this.setupWall(this.topWall, true, context);
    this.setupWall(this.bottomWall, false, context);
  };

  pong.setupPaddle = function(paddle, playerOne, context) {
    var canvasWidth = context.canvas.width;
    var playableAreaMiddleHeight = context.canvas.height * .6;
    var paddleHeight = context.canvas.height * .15;
    var paddleWidth = 20;
    var startX = 10;
    var startY = playableAreaMiddleHeight - paddleHeight / 2;
    if (!playerOne) {
      startX = canvasWidth - paddleWidth - 10;
    }
    paddle.addPoint(startX, startY);
    paddle.addPoint(startX + paddleWidth, startY);
    paddle.addPoint(startX + paddleWidth, startY + paddleHeight);
    paddle.addPoint(startX, startY + paddleHeight);
  }; // pong.setupPaddle

  pong.draw = function(context) {
    var height = context.canvas.height;
    var width = context.canvas.width;
    this.drawBackground(context);
    this.drawScoreboard(context);
    this.drawShapes(context);
  }.bind(pong);

  pong.drawShapes = function(context) {
    var shapeCount = this.shapes.length;
    for (var i = 0; i < shapeCount; i++) {
      this.shapes[i].draw(context);
    }
  };

  pong.drawBackground = function(context) {
    context.save();
    context.fillStyle = 'rgba(0,0,0,1)';
    context.beginPath();
    context.rect(0, 0, context.canvas.width, context.canvas.height);
    context.stroke();
    context.fill();
    context.restore();
    this.drawCenterLine(context);
  };

  pong.drawCenterLine = function(context) {
    var canvasHeight = context.canvas.height;
    var canvasWidth = context.canvas.width;
    var lineWidth = canvasWidth * .02;
    var lineHeight = canvasHeight * .05;
    context.save();
    context.fillStyle = 'rgba(255, 255, 255, 1)';
    
    for(var step = 4.5; step < 20; step += 2 ) {
      context.beginPath();
      context.rect((canvasWidth / 2) - (lineWidth / 2), step * lineHeight, lineWidth, lineHeight);
      context.fill();
    }
    context.restore();
      
  }; // pong.drawCenterLine

  pong.drawScoreboard = function(context) {
    context.save();
    context.fillStyle = 'rgba(255, 255, 255, 1)';
    this.drawScores(context, this.scores);
    context.restore();
  };

  pong.drawScores = function(context, scores) {
    var firstScore = scores[0].toString();
    var secondScore = scores[1].toString();
    var firstScoreWidth = context.measureText(firstScore).width;
    var secondScoreWidth = context.measureText(secondScore).width;
    context.fillText(
        firstScore, 
        (context.canvas.width / 4) - (firstScoreWidth / 2),
        context.canvas.height * .18
    );
    context.fillText(
        secondScore, 
        (context.canvas.width * 3 / 4) - (secondScoreWidth / 2),
        context.canvas.height * .18
    );
  }; // pong.drawScores


  // Width of score can run off canvas
  pong.setDynamicFontSize = function(context) {
    var maxScoreHeight = context.canvas.height * .16;
    var minScoreHeight = maxScoreHeight - 5;
    var fontSize = Math.round(maxScoreHeight * .75);
    context.font = fontSize + 'px Times New Roman';
    var textHeight = this.getTextHeight(context);

    while (textHeight > maxScoreHeight) {
      fontSize--;
      context.font = fontSize + 'pt Times New Roman';
      textHeight = this.getTextHeight(context);
    }

    while(textHeight < minScoreHeight) {
      fontSize++;
      context.font = fontSize + 'pt Times New Roman';
      textHeight = this.getTextHeight(context);
    }
    this.fontSize = fontSize;
  }; // pong.setDynamicFontSize

  pong.getTextHeight = function(context) {
    return context.measureText('W').width * 7 / 6;
  };

  game.paint = function() { return renderer.draw(pong.draw); };
  game.clearCanvas = renderer.clear.bind(renderer);
  
  root.onload = function() {
    renderer.setup.call(renderer);
    pong.setDynamicFontSize(pong.game.context);
    pong.setup.call(pong, pong.game.context);
  };

  root.onresize = function() {
    var initialWidth = pong.game.context.canvas.width;
    var initialHeight = pong.game.context.canvas.height;
    renderer.handleResize.call(renderer, pong.game.context);
    pong.setDynamicFontSize(pong.game.context);
    pong.translatePlayableArea(initialWidth, initialHeight, pong.game.context);
  };
  game.start();
})(this); // private namespace

