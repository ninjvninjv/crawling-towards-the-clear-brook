// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/kKT0v3qhIQY

function LeafEph(x, y) {
  this.pos = createVector(x, y);
  this.reached = false;

  this.show = function() {
    var xZ, yZ, wZ, hZ;
    fill(255);
    noStroke();
    //ellipse(this.pos.x, this.pos.y, 1, 1);
      ellipse(x, y, 2, 2);

  };
}
