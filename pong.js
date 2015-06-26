;(function(root) {
  var pong = root.Pong = (root.Pong || {});
  var game = pong.game = new root.Game('pong', 'pongCanvas');
  var renderer = pong.renderer = new root.twoDimensionalRenderer(pong.game.context);
  pong.shapes = [];

  // pong.

  pong.draw = function(context) {
    var height = context.canvas.height;
    var width = context.canvas.width;
    var shapeCount = this.shapes.length - 1;
    this.drawBackground(context);
    this.drawScoreboard(context);
    this.drawShapes(context);
  }.bind(pong);

  pong.drawShapes = function(context) {
    for (var i = 0; i < this.shapeCount; i++) {
      shape[i].draw(context);
    }
  };

  pong.drawBackground = function(context) {
    context.fillStyle = 'rgba(255,0,0,1)';
    context.beginPath();
    context.rect(0, 0, context.canvas.width, context.canvas.height);
    context.stroke();
    context.fill();
  };

  pong.drawScoreboard = function(context) {

  };

  game.paint = function() { return renderer.draw(pong.draw); };
  game.clearCanvas = renderer.clear.bind(renderer);
  root.onload = renderer.setup.bind(renderer);
  root.onresize = renderer.handleResize.bind(renderer);
  game.start();
})(this); // private namespace

