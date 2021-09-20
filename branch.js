// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/kKT0v3qhIQY

function Branch(parent, pos, dir) {
  this.pos = pos;
  this.parent = parent;
  this.dir = dir;
  this.origDir = this.dir.copy();
  this.count = 0;
  this.len = 15;
  this.widthDir = 1;
  this.width = 1;

  if (this.parent === null){
    this.width = 1;
  } else {
    if (this.parent.width >= 8) {
      this.widthDir = -1;
    } else if (this.parent.width <= 1) {
      this.widthDir = 1;
      this.width = 1;
    } else if (this.parent.widthDir === -1) {
      this.widthDir = -1;
    }
    this.width = Math.ceil(this.parent.width + (random(0, 2) * random(0, 1) * this.widthDir));
  }

  this.reset = function() {
    this.dir = this.origDir.copy();
    this.count = 0;
  };

  this.next = function() {
    var nextDir = p5.Vector.mult(this.dir, this.len);
    var nextPos = p5.Vector.add(this.pos, nextDir);
    var nextBranch = new Branch(this, nextPos, this.dir.copy());
    return nextBranch;
  };

  this.show = function() {
    if (parent != null) {
      stroke(0);
      strokeWeight(this.width);
      line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
    }
  };
}
