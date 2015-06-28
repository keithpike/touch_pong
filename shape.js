;(function(root) {

  var Point = root.Point = function(x, y) {
    this.x = x;
    this.y = y;
  };

  var Shape = root.Shape = function() {
    this.fillStyle = 'rgba(255, 255, 255, 1)';
    this.strokeStyle = 'white';
  };

  Shape.prototype.fill = function(context) {
    context.save();
    context.fillStyle = this.fillStyle;
    this.createPath(context);
    context.fill();
    context.restore();
  };

})(this);