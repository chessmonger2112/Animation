// FireballMonger = function(x, y, direction) {

  function FireballMonger (x, y, direction) {
    var pos = {
      x: x,
      y: y,
      r: 45
    };
    var TAU = 2 * Math.PI;
    var fillColor = "orange";

    this.update = function() {
        pos.x += 2.5 * direction;
        context.beginPath();
        context.arc(pos.x, pos.y, pos.r, 0, TAU, false);
        context.fillStyle = fillColor;
        context.fill();
        context.stroke();
        context.closePath();
    },

    this.getCoordinates = function() {
        return pos;
    }
}
