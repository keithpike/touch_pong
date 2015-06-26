;(function(root) {
  root.requestNextAnimationFrame = (function() {
  var self = this;

  return root.requestAnimationFrame   ||
    root.webkitRequestAnimationFrame  ||
    root.mozRequestAnimationFrame     ||
    root.oRequestAnimationFrame       ||
    root.msRequestAnimationFrame      ||
    function (callback) {
      var startTime;
      var endTime;

      root.setTimeout(function() {
        startTime = Date.now();
        callback(startTime);
        endTime = Date.now();
        self.timeout = (1000 / 60) - (endTime - startTime);
      }, self.timeout);
    };
  })(); // root.requestNextAnimationFrame
})(this); // private namespace
