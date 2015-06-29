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

  Polygon.prototype.move = function(dx, dy) {
    var tempPoint;
    var numPoints = this.points.length;
    for (i = 0; i < numPoints; i++) {
      tempPoint = this.points[i];
      tempPoint.x += dx;
      tempPoint.y += dy;
    }
  };

  Polygon.prototype.boundingBox = function() {
    var numPoints = this.points.length;
    if (this.points.length === 0) {return;}
    var minX = this.points[0].x;
    var minY = this.points[0].y;
    var maxX = this.points[0].x;
    var maxY = this.points[0].y;
    var point;


   for (var i = 1; i < numPoints; i++) {
      point = this.points[i];
      minX = Math.min(minX, point.x);
      minY = Math.min(minY, point.y);
      maxX = Math.max(maxX, point.x);
      maxY = Math.max(maxY, point.y);
   }

   return [
           minX,
           minY,
           maxX - minX,
           maxY - minY
          ];
  }; // Polygon.prototype.boundingBox

  Polygon.prototype.center = function() {
    var sumX = 0;
    var sumY = 0;
    var numPoints = this.points.length;
    var point;
    for (var i = 0; i < numPoints; i++) {
      point = this.points[i];
      sumX += point.x;
      sumY += point.y;
    }
    return [sumX / numPoints, sumY / numPoints];
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

  Circle.prototype.move = function(dx, dy) {
    this.centerPoint.x += dx;
    this.centerPoint.y += dy;
  };

  Circle.prototype.boundingBox = function () {
   return [
            this.centerPoint.x - this.radius,
            this.centerPoint.y - this.radius,
            this.radius * 2,
            this.radius * 2
          ];
};

})(this);