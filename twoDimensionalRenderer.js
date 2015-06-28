;(function(root) {
  var twoDimensionalRenderer = root.twoDimensionalRenderer = function(context) {
    this.context = context;
  };

  function determineViewportWidth() {
    return root.innerWidth ||
           document.documentElement.clientWidth ||
           document.body.clientWidth;
  }

  function determineViewportHeight() {
    return root.innerHeight ||
           document.documentElement.clientHeight ||
           document.body.clientHeight;
  }

  function determineDisplayWidth() {
    return root.screen.width;
  }

  function determineDisplayHeight() {
    return root.screen.height;
  }

  function determineAvailableDisplayWidth() {
    return root.screen.availWidth;
  }

  function determineAvailableDisplayHeight() {
    return root.screen.availHeight;
  }

  function determineDocumentWidth() {
    return Math.max(
      document.body.clientWidth,
      document.body.offsetWidth,
      document.body.scrollWidth,
      document.documentElement.clientWidth,
      document.documentElement.offsetWidth,
      document.documentElement.scrollWidth
    );
  }

  function determineDocumentHeight() {
    return Math.max(
      document.body.clientHeight,
      document.body.offsetHeight,
      document.body.scrollHeight,
      document.documentElement.clientHeight,
      document.documentElement.offsetHeight,
      document.documentElement.scrollHeight
    );
  }

  twoDimensionalRenderer.prototype.setup = function() {
    this.context.canvas.setAttribute('width', determineViewportWidth());
    this.context.canvas.setAttribute('height', determineViewportHeight());
  };

  twoDimensionalRenderer.prototype.handleResize = function() {
    this.clear();
    this.setDrawingWidthToViewportSize();
    this.setDrawingHeightToViewportSize();
  };

  twoDimensionalRenderer.prototype.setDrawingWidthToViewportSize = function() {
    this.context.canvas.setAttribute('width', determineViewportWidth());
  };

  twoDimensionalRenderer.prototype.setDrawingHeightToViewportSize = function() {
    this.context.canvas.setAttribute('height', determineViewportHeight());
  };

  twoDimensionalRenderer.prototype.clear = function() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  };

  twoDimensionalRenderer.prototype.draw = function(callback) {
    callback.call(callback, this.context);
  };

})(this); //private namespace