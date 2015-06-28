;(function(root) {
  var pong = root.Pong = (root.Pong || {});
  var game = pong.game = new Game('pong', 'pongCanvas');
  var renderer = pong.renderer = new root.twoDimensionalRenderer(pong.game.context);
  pong.shapes = [];

  // pong.
  pong.hello = function() {};
  pong.draw = function(context) {
    var height = context.canvas.height;
    var width = context.canvas.width;
    var shapeCount = this.shapes.length - 1;
    this.drawBackground(context);
    this.drawScoreboard(context);
    // this.drawShapes(context);
  }.bind(pong);

  pong.drawShapes = function(context) {
    for (var i = 0; i < this.shapeCount; i++) {
      shape[i].draw(context);
    }
  };

  pong.drawBackground = function(context) {
    context.fillStyle = 'rgba(0,0,0,1)';
    context.beginPath();
    context.rect(0, 0, context.canvas.width, context.canvas.height);
    context.stroke();
    context.fill();
    this.drawCenterLine(context);
  };

  pong.drawCenterLine = function(context) {
    var canvasHeight = context.canvas.height;
    var canvasWidth = context.canvas.width;
    var lineWidth = canvasWidth * .02;
    var lineHeight = canvasHeight * .05;

    context.fillStyle = 'rgba(255, 255, 255, 1)';
    
    for(var step = 4.5; step < 20; step += 2 ) {
      context.beginPath();
      context.rect((canvasWidth / 2) - (lineWidth / 2), step * lineHeight, lineWidth, lineHeight);
      context.fill();
    }
      
  };

  pong.drawScoreboard = function(context) {
    context.fillStyle = 'rgba(255, 255, 255, 1)';
    this.setFontSize(context);
    this.getScorePositions;
    this.scores[0];
  };

  pong.setDynamicSizeFont = function(context) {
    context.font = 100 + 'px Times New Roman';
    // console.log(100.toString() + 'px Palatino');
  };

  game.paint = function() { return renderer.draw(pong.draw); };
  game.clearCanvas = renderer.clear.bind(renderer);
  root.onload = renderer.setup.bind(renderer);
  root.onresize = renderer.handleResize.bind(renderer);
  game.start();
})(this); // private namespace

