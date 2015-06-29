;(function(root) {

  var Point = root.Point = function(x, y) {
    this.x = x;
    this.y = y;
  };

  var Shape = root.Shape = function() {
    this.fillStyle = 'rgba(255, 255, 255, 1)';
    this.strokeStyle = 'rgba(255, 255, 255, 1)';
  };

  Shape.prototype.draw = function(context) {
    context.save();
    context.fillStyle = this.fillStyle;
    this.createPath(context);
    context.fill();
    context.restore();
  };

  function Surrogate() {};
  Surrogate.prototype = Shape.prototype;

  var Polygon = root.Polygon = function() {
    Shape.call(this);
    this.points = [];
  };
  
  Polygon.prototype = new Surrogate();

  Polygon.prototype.addPoint = function(x, y) {
    this.points.push(new Point(x, y));
  };

  // expects an array of point objects
  Polygon.prototype.removePoints = function() {
    this.points = [];
  };

  Polygon.prototype.createPath = function(context) {
    var numPoints = this.points.length;
    context.beginPath();
    context.moveTo(this.points[0].x, this.points[0].y);
    for (var i = 0; i < numPoints; i++) {
      context.lineTo(this.points[i].x, this.points[i].y);
    }
    context.closePath();
  };

  var Circle = root.Circle = function(x, y, radius) {
    Shape.call(this);
    this.radius = radius || 1;
    this.centerPoint = new Point(x, y);
  };

  Circle.prototype = new Surrogate();

  Circle.prototype.createPath = function(context) {
    context.beginPath();
    context.arc(this.centerPoint.x, this.centerPoint.y, this.radius, 0, Math.PI * 2, false);
  };

})(this);