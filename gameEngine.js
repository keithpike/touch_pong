;(function(root) {

  function getCurrentTime() {
    return Date.now();
  }

  var Game = root.Game = function(gameName, canvasId) {
    var canvas = document.getElementById(canvasId);
    var self = this;

    this.context = canvas.getContext('2d');
    this.gameName = gameName;   
    this.gameStartTime = 0;
    this.lastAnimatedTime = 0;
    this.gameTime = 0;
    this.STARTING_FPS = 60;
    this.fps = this.STARTING_FPS;

    return this;
  }; // Game

  Game.prototype.animate = function(time) {
    self = this;
    this.updateEngineStats(time);
    this.clearCanvas();
    this.paint();
    this.updateAnimatedTime(time);
    console.log(this.fps);
    root.requestNextAnimationFrame(function(time) { 
      self.animate.call(self, time);
    });
  }; // Game.animate

  Game.prototype.updateEngineStats = function(time) {
    this.updateFrameRate(time);
    this.updateGameTime(time);
  };

  Game.prototype.updateFrameRate = function(time) {
    if (this.gameTime > 0) {
      this.fps = 1000 / (time - this.lastAnimatedTime);
    }
  };

  Game.prototype.updateGameTime = function(time) {
    this.gameTime = getCurrentTime() - this.gameStartTime;
  };

  Game.prototype.updateAnimatedTime = function(time) {
    this.lastAnimatedTime = time;
  };

  Game.prototype.start = function() {
    var self = this;

    this.startTime = getCurrentTime();
    root.requestNextAnimationFrame(function(time) {
      self.animate.call(self, time);
    });
  }; // Game.start

  Game.prototype.clearCanvas = function() {}; // to be overridden by game specific implementation
  Game.prototype.paint = function() {}; // to be overridden by game specific implementation
})(this); // private namespace