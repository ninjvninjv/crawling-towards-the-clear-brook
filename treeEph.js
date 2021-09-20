// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/kKT0v3qhIQY

function TreeEph() {
  this.leavesEph = [];
  this.branchesEph = [];
  var angle = 0;
  var step  //distance between steps in radians
  var distance = 10 + ho*15;
  var rando = 1.618033988749894848204586834
  var piStep
  var pos = createVector(random(width), random(height));
  var dir = createVector(0, -1);
  var inX = pos.x;
  var inY = pos.y;
  this.leavesEph.push(new LeafEph(pos.x, pos.y));

  for (var i = 0; i < ho*40; i++) {
    rando = (Math.random() * 0.2) + 1.5
    step  = TWO_PI/rando;
    angle = angle + step;
    var inX = inX + distance * sin(angle);
    var inY = inY + distance * cos(angle);
    var maxWidth = windowWidth - 10;
    var maxHeight = windowHeight - 10;
    if (inX > 10 && inY > 10 && inX < maxWidth && inY < maxHeight) {
      this.leavesEph.push(new LeafEph(inX, inY));
    }
  }
  var root = new BranchEph(null, pos, dir);
  this.branchesEph.push(root);
  var current = root;
  var found = false;
  while (!found) {
    for (var i = 0; i < this.leavesEph.length; i++) {
      var d = p5.Vector.dist(current.pos, this.leavesEph[i].pos);
      if (d < max_distEph) {
        found = true;
      }
    }
    if (!found) {
      var branch = current.next();
      current = branch;
      this.branchesEph.push(current);
    }
  }

  this.grow = function() {
    for (var i = 0; i < this.leavesEph.length; i++) {
      var leaf = this.leavesEph[i];
      var closestBranchEph = null;
      var record = max_distEph;
      for (var j = 0; j < this.branchesEph.length; j++) {
        var branch = this.branchesEph[j];
        var d = p5.Vector.dist(leaf.pos, branch.pos);
        if (d < min_distEph) {
          leaf.reached = true;
          closestBranchEph = null;
          noStroke();
          fill(0);
          var wZ, hZ;
          //ellipse(this.pos.x, this.pos.y, 1, 1);
          xZ = random(width);
          yZ = random(height);
          wZ = random(ho/4, ho/4+1.5);
          hZ = random(ho/4, ho/4+1.5);
          ellipse(this.leavesEph[i].pos.x, this.leavesEph[i].pos.y, wZ, hZ);
          break;
        } else if (d < record) {
          closestBranchEph = branch;
          record = d;
        }
      }

      if (closestBranchEph != null) {
        var newDir = p5.Vector.sub(leaf.pos, closestBranchEph.pos);
        newDir.normalize();
        closestBranchEph.dir.add(newDir);
        closestBranchEph.count++;
      }
    }

    for (var i = this.leavesEph.length - 1; i >= 0; i--) {
      if (this.leavesEph[i].reached) {
      }
    }

    for (var i = this.branchesEph.length - 1; i >= 0; i--) {
      var branch = this.branchesEph[i];
      if (branch.count > 0) {
        branch.dir.div(branch.count + 1);
        this.branchesEph.push(branch.next());
        branch.reset();
      }
    }
  };

  this.show = function() {
    for (var i = 0; i < this.leavesEph.length; i++) {
      this.leavesEph[i].show();
    }

    for (var i = 0; i < this.branchesEph.length; i++) {
      this.branchesEph[i].show();
    }
  };
}
