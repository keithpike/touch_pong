;(function(root) {
  var pong = root.Pong = (root.Pong || {});
  var game = pong.game = new Game('pong', 'pongCanvas');
  var renderer = pong.renderer = new root.twoDimensionalRenderer(pong.game.context);
  var activeTouches = {};
  var canvas = document.getElementById('pongCanvas');

  canvas.addEventListener('touchstart', handleTouchStart);
  canvas.addEventListener('touchmove', handleTouchMove);
  canvas.addEventListener('touchend', handleTouchEnd);
  pong.shapes = [];
  pong.scores = [0, 0];
  pong.fontSize = 10;
  // pong.started = false;
  pong.awesomeVelocityRatio = .5;
  pong.wallHeight = 5;
  pong.paddleOffset = 15;
  pong.paddleWidth = 20;
  pong.fingerLeeway = 15;
  pong.playAreaHeight;
  pong.playAreaWidth;
  pong.playAreaTop;
  pong.playAreaBottom;
  pong.playAreaMiddleHeight;
  pong.canvasHeight;
  pong.canvasWidth;
  pong.scoreBoardHeight;
  pong.scoreBoardWidth;
  pong.scoreBoardTop;
  pong.scoreBoardBottom;
  




  function handleTouchStart(event) {
    event.preventDefault();
    var myFinger;
    var touch;
    for (var i = 0; i < event.changedTouches.length; i++) {
      touch = event.changedTouches[i];
      myFinger = new Circle(touch.pageX, touch.pageY, 10)
      activeTouches[touch.identifier] = { pageX: touch.pageX,
                                          pageY: touch.pageY,
                                          finger: myFinger,
                                          timeStarted: game.gameTime 
                                        };
      pong.shapes.push(myFinger); // for debugging purposes
    }
  }

  // I realize using this will be a little hassle,
  // I added a bounding box instead of using the size of the paddle directly
  // to give a little ease of use I think it should be bigger still
  function handleTouchMove(event) {
    event.preventDefault();
    var paddle;
    var id;
    var touch;
    for(var i = 0; i < event.touches.length; i++) {
      id = event.touches[i].identifier;
      touch = event.touches[i];
      activeTouches[id].finger.move(touch.pageX - activeTouches[id].pageX,
                                    touch.pageY - activeTouches[id].pageY) // for debugging purposes
      paddle = pong.checkWithinPaddle(activeTouches[id].pageX,
                                      activeTouches[id].pageY);
      if (paddle) {
        pong.movePaddle(paddle, touch.pageY - activeTouches[id].pageY);
      }
      activeTouches[id].pageX = touch.pageX;
      activeTouches[id].pageY = touch.pageY;
    }
  }

  function handleTouchEnd(event) {
    event.preventDefault();
    var numChangedTouches = event.changedTouches.length;
    var time = game.gameTime;
    for(var i = 0; i < numChangedTouches; i++) {
      var id = event.changedTouches[i].identifier;

      if (activeTouches[id].timeStarted >= time - 200) {
        pong.hulkSmash(time); // Hulk make things go fasta!
      }
      delete activeTouches[id];
      pong.shapes.pop();
    }
  }

  pong.setup = function() {
    this.updateLayoutVariables();
    this.ball = new Circle(this.playAreaWidth / 2, this.playAreaHeight / 2 + this.scoreBoardHeight, 20);
    
    this.playerOnePaddle = new Polygon();
    this.playerTwoPaddle = new Polygon();
    this.setupPaddle(this.playerOnePaddle, true);
    this.setupPaddle(this.playerTwoPaddle, false);

    this.topWall    = new Polygon();
    this.bottomWall = new Polygon();
    this.setupWall(this.topWall, true);
    this.setupWall(this.bottomWall, false);
    
    this.shapes.push(pong.ball);
    this.shapes.push(pong.playerOnePaddle);
    this.shapes.push(pong.playerTwoPaddle);
    this.shapes.push(this.topWall);
    this.shapes.push(this.bottomWall);

    this.ball.velocityX = this.canvasWidth * this.awesomeVelocityRatio;
    this.ball.velocityY = this.getStartingYVelocity(this.canvasHeight);
    this.ball.paddleCollisionTime = -1;
  }; // pong.setup

  pong.updateLayoutVariables = function() {
    this.canvasHeight = this.game.context.canvas.height;
    this.canvasWidth = this.game.context.canvas.width;

    this.scoreBoardTop = 0;
    this.scoreBoardBottom = this.canvasHeight * .2;
    this.scoreBoardHeight = this.scoreBoardBottom - this.scoreBoardTop;
    this.scoreBoardWidth = this.canvasWidth;
    
    this.playAreaTop = this.canvasHeight * .2 + this.wallHeight;
    this.playAreaBottom = this.canvasHeight - this.wallHeight;
    this.playAreaWidth = this.canvasWidth;
    this.playAreaHeight = this.playAreaBottom - this.playAreaTop;
    this.playAreaMiddleHeight = this.scoreBoardHeight + this.wallHeight + this.playAreaHeight * .5;
    this.playAreaMiddleWidth = this.playAreaWidth * .5;

  };

  pong.setupWall = function(wall, isTop) {
    var startY;
    if (isTop) {
      startY = this.playAreaTop;
    } else {
      startY = this.playAreaBottom;
    }
    wall.addPoint(0, startY);
    wall.addPoint(this.canvasWidth, startY);
    wall.addPoint(this.canvasWidth, startY + this.wallHeight);
    wall.addPoint(0, startY + this.wallHeight);
  };

  pong.resetWalls = function() {
    this.topWall.removePoints();
    this.bottomWall.removePoints();
    this.setupWall(this.topWall, true);
    this.setupWall(this.bottomWall, false);
  }

  pong.getTranslationForAxes = function(initialWidth, initialHeight) {
    return [this.canvasWidth / initialWidth,
            this.canvasHeight / initialHeight];
  }

  pong.translatePlayableArea = function(initialWidth, initialHeight) {
    // var axesTranslations = this.getTranslationForAxes(initialWidth, initialHeight);
    
    // relocate Walls
    this.resetWalls();

    // stretch paddles as necessary
    // relocate paddles
    // this.translatePaddle(this.playerOnePaddle, true, axesTranslations);
    // this.translatePaddle(this.playerTwoPaddle, false, axesTranslations);
    
    // relocate ball

    // modify ball's velocity to match new playarea

  };

  // TO BE COMPLETED
  pong.translatePaddle = function(paddle, playerOne, translationRatios) {
    var points = paddle.points;
    this.translateYPoints(points, translationRatios[1]); // 0 = x, 1 = y
    if (!playerOne) {
      this.canvasWidth - this.paddleOffset;

    }
      


  };

  pong.translateYPoints = function(points, translationRatio) {
    var numPoints = points.length;
    var point;
    for (var i = 0; i < numPoints; i++) {
      point = points[i];
      points[i].y = point.y * translationRatio;
    }
  }

  pong.setupPaddle = function(paddle, playerOne) {
    var paddleHeight = this.canvasHeight * .15;
    var paddleWidth = 20;
    var startX = this.paddleOffset;
    var startY = this.playAreaMiddleHeight - paddleHeight / 2;
    if (!playerOne) {
      startX = this.canvasWidth - paddleWidth - this.paddleOffset;
    }
    paddle.addPoint(startX, startY);
    paddle.addPoint(startX + paddleWidth, startY);
    paddle.addPoint(startX + paddleWidth, startY + paddleHeight);
    paddle.addPoint(startX, startY + paddleHeight);
  }; // pong.setupPaddle

  pong.resetBall = function(isPlayerOne) {
    this.ball.centerPoint.x = this.canvasWidth * .5;
    this.ball.centerPoint.y = this.scoreBoardHeight + this.playAreaHeight * .5;
    if (isPlayerOne) {
      this.ball.velocityX = this.canvasWidth * this.awesomeVelocityRatio * -1;
      this.ball.velocityY = this.getStartingYVelocity(this.canvasHeight);
    } else {
      this.ball.velocityX = this.canvasWidth * this.awesomeVelocityRatio;
      this.ball.velocityY = this.getStartingYVelocity(this.canvasHeight);
    }
  }

  pong.getStartingYVelocity = function(height) {
    return height * this.awesomeVelocityRatio * Math.sin(Math.PI * (1 - 2 * Math.random()));
  };

  pong.drawCircle = function(posX, posY, radius) {
    var myFinger = new Circle(posX, posY, radius);
    this.shapes.push(myFinger);
  };

  pong.draw = function() {
    this.drawBackground();
    this.drawScoreboard();
    this.drawShapes();
  }.bind(pong);

  pong.drawShapes = function() {
    var shapeCount = this.shapes.length;
    for (var i = 0; i < shapeCount; i++) {
      this.shapes[i].draw(this.game.context);
    }
  };

  // talk about a way to show my current collision detection is sorely lacking
  pong.hulkSmash = function(time) {
    if (this.ball.paddleCollisionTime >= time - 200) {
      this.ball.velocityX *= 1.1; 
      this.ball.velocityY *= 1.1;
    }
  };

  pong.drawBackground = function() {
    this.game.context.save();
    this.game.context.fillStyle = 'rgba(0,0,0,1)';
    this.game.context.beginPath();
    this.game.context.rect(0, 0, this.canvasWidth, this.canvasHeight);
    this.game.context.stroke();
    this.game.context.fill();
    this.game.context.restore();
    this.drawCenterLine();
  }; // pong.drawBackground

  pong.drawCenterLine = function() {
    var lineWidth = this.canvasWidth * .02;
    var lineHeight = this.canvasHeight * .05;
    this.game.context.save();
    this.game.context.fillStyle = 'rgba(255, 255, 255, 1)';
    
    for(var step = 4.5; step < 20; step += 2 ) {
      this.game.context.beginPath();
      this.game.context.rect((this.canvasWidth / 2) - (lineWidth / 2), step * lineHeight, lineWidth, lineHeight);
      this.game.context.fill();
    }
    this.game.context.restore();
      
  }; // pong.drawCenterLine

  pong.drawScoreboard = function() {
    this.game.context.save();
    this.game.context.fillStyle = 'rgba(255, 255, 255, 1)';
    this.drawScores(this.scores);
    this.game.context.restore();
  };

  pong.drawScores = function(scores) {
    var firstScore = scores[0].toString();
    var secondScore = scores[1].toString();
    var firstScoreWidth = this.game.context.measureText(firstScore).width;
    var secondScoreWidth = this.game.context.measureText(secondScore).width;
    this.game.context.fillText(
        firstScore, 
        (this.canvasWidth / 4) - (firstScoreWidth / 2),
        this.scoreBoardHeight * .8
    );
    this.game.context.fillText(
        secondScore, 
        (this.canvasWidth * 3 / 4) - (secondScoreWidth / 2),
        this.scoreBoardHeight * .8
    );
  }; // pong.drawScores

  pong.movePaddle = function(paddle, dy) {
    var boundingBox = paddle.boundingBox();
    var paddleBottom = boundingBox[1] + boundingBox[3];
    var paddleTop = boundingBox[1];
    if (dy < 0) {
      dy = Math.max(this.playAreaTop - paddleTop, dy);
    } else {
      dy = Math.min(dy, this.playAreaBottom - paddleBottom);
    }
    paddle.move(0, dy);
  };

  pong.checkWithinPaddle = function(documentX, documentY) {
    var playerOnePaddleBoundingBox = this.playerOnePaddle.boundingBox();
    if (documentX < playerOnePaddleBoundingBox[0] + playerOnePaddleBoundingBox[2] + this.fingerLeeway &&
        documentX > playerOnePaddleBoundingBox[0] - this.fingerLeeway &&
        documentY < playerOnePaddleBoundingBox[1] + playerOnePaddleBoundingBox[3] &&
        documentY > playerOnePaddleBoundingBox[1]) {
      return this.playerOnePaddle;
    }
    var playerTwoPaddleBoundingBox = this.playerTwoPaddle.boundingBox();
    if (documentX < playerTwoPaddleBoundingBox[0] + playerTwoPaddleBoundingBox[2] + this.fingerLeeway &&
        documentX > playerTwoPaddleBoundingBox[0] - this.fingerLeeway &&
        documentY < playerTwoPaddleBoundingBox[1] + playerTwoPaddleBoundingBox[3] &&
        documentY > playerTwoPaddleBoundingBox[1]) {
      return this.playerTwoPaddle;
    }
  }; // pong.checkWithinPaddle

  // Width of score can run off canvas
  pong.setDynamicFontSize = function() {
    var maxScoreHeight = this.scoreBoardHeight * .8
    var minScoreHeight = maxScoreHeight - 5;
    var fontSize = Math.round(maxScoreHeight * .75); // rough estimate for font height for Times New Roman
    this.game.context.font = fontSize + 'px Times New Roman';
    var textHeight = this.getTextHeight();

    while (textHeight > maxScoreHeight) {
      fontSize--;
      this.game.context.font = fontSize + 'pt Times New Roman';
      textHeight = this.getTextHeight();
    }

    while(textHeight < minScoreHeight) {
      fontSize++;
      this.game.context.font = fontSize + 'pt Times New Roman';
      textHeight = this.getTextHeight();
    }
    this.fontSize = fontSize;
  }; // pong.setDynamicFontSize

  pong.getTextHeight = function() {
    return this.game.context.measureText('W').width * 7 / 6;
  };

  pong.checkBallBounds = function(context) {
    if (0 >= this.ball.centerPoint.x - this.ball.radius) {
      this.scores[1]++;
      this.resetBall(false);
    } else if (this.canvasWidth <= this.ball.centerPoint.x + this.ball.radius) {
      this.scores[0]++;
      this.resetBall(true);
    } else if (this.playAreaTop >= this.ball.centerPoint.y - this.ball.radius && this.ball.velocityY < 0) {
      this.ball.velocityY *= -1;
    } else if (this.playAreaBottom <= this.ball.centerPoint.y + this.ball.radius && this.ball.velocityY > 0) {
      this.ball.velocityY *= -1;
    }
  }; // pong.checkBallBounds

  pong.paddleCollisionCheck = function(boundingBox1, boundingBox2) {
      // ax < bx + bw, ay < by + bh, bx < ax + aw, by < ay + ah
      var x1 = boundingBox1[0];
      var y1 = boundingBox1[1];
      var width1 = boundingBox1[2];
      var height1 = boundingBox1[3];
      var x2 = boundingBox2[0];
      var y2 = boundingBox2[1];
      var width2 = boundingBox2[2];
      var height2 = boundingBox2[3];

      return x1 < x2 + width2 &&
             y1 < y2 + height2 &&
             x2 < x1 + width1 &&
             y2 < y1 + height1;
  };

  game.gameUpdates = function() {
    var paddleBoundingBox = pong.ball.velocityX > 0 ? pong.playerTwoPaddle.boundingBox() : pong.playerOnePaddle.boundingBox();
    var ballBoundingBox = pong.ball.boundingBox();
    
    pong.checkBallBounds(this.context);
    pong.ball.move(
        this.FPSBasedVelocity(pong.ball.velocityX),
        this.FPSBasedVelocity(pong.ball.velocityY)
    );

    if (pong.paddleCollisionCheck(paddleBoundingBox, ballBoundingBox)) {
      // ball center y - paddle highest y / paddle height - .5 give a range of -.5 thru .5
      var paddleHitAngle = (pong.ball.centerPoint.y - paddleBoundingBox[1]) / paddleBoundingBox[3] - .5;
      pong.ball.paddleCollisionTime = this.gameTime;
      pong.ball.velocityY = pong.canvasHeight * pong.awesomeVelocityRatio * Math.sin(Math.PI * .5 * paddleHitAngle);
      pong.ball.velocityX *= -1;
    }
    
  };

  game.paint = function() { return renderer.draw(pong.draw); };

  game.clearCanvas = renderer.clear.bind(renderer);
  
  root.onload = function() {
    renderer.setup.call(renderer);
    pong.setup.call(pong);
    pong.setDynamicFontSize();
  };

  root.onresize = function() {
    var initialWidth = pong.canvasWidth;
    var initialHeight = pong.canvasHeight;
    renderer.handleResize.call(renderer, pong.game.context);
    pong.updateLayoutVariables();
    pong.setDynamicFontSize();
    pong.translatePlayableArea(initialWidth, initialHeight);
  };

  game.start();
})(this);

