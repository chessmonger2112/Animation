function FireballMonger (x, y, direction) {
    var pos = {
      x: x,
      y: y,
      r: 45
    };
    var TAU = 2 * Math.PI;
    var fillColor = "orange";
    var fireBallSpeed = 8;

    function drawFireball () {
      context.beginPath();
      context.arc(pos.x, pos.y, pos.r, 0, TAU, false);
      context.fillStyle = fillColor;
      context.fill();
      context.stroke();
      context.closePath();
    }

    this.update = function() {
        var dx = fireBallSpeed * direction;
        pos.x += dx;
        drawFireball();
    },

    this.getCoordinates = function() {
        return pos;
    }
}
