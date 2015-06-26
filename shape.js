;(function(root) {
  var Point = function(x, y) {
    this.x = x;
    this.y = y;
  };

  var Shape = function() {
    this.fillStyle = 'rgba(255, 255, 255, 1)';
    this.strokeStyle = 'white';
  };

  Shape.prototype.draw = function(context) {
    context.save();
    context.fillStyle = this.fillStyle;
    context.fill();
    context.restore;
  };

})(this);