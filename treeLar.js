// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/kKT0v3qhIQY

function TreeLar(mx, my) {
  this.leavesLar = [];
  this.branchesLar = [];

  for (var i = 0; i < 15; i++) {
    this.leavesLar.push(new LeafLar());
  }
  var pos = createVector(mx, my);
  var dir = createVector(0, -1);
  var root = new BranchLar(null, pos, dir);
  this.branchesLar.push(root);
  var current = root;
  var found = false;
  while (!found) {
    for (var i = 0; i < this.leavesLar.length; i++) {
      var d = p5.Vector.dist(current.pos, this.leavesLar[i].pos);
      if (d < max_dist) {
        found = true;
      }
    }
    if (!found) {
      var branchLar = current.next();
      current = branchLar;
      this.branchesLar.push(current);
    }
  }

  this.grow = function() {
    for (var i = 0; i < this.leavesLar.length; i++) {
      var leafLar = this.leavesLar[i];
      var closestBranchLar = null;
      var record = max_dist;
      for (var j = 0; j < this.branchesLar.length; j++) {
        var branchLar = this.branchesLar[j];
        var d = p5.Vector.dist(leafLar.pos, branchLar.pos);
        if (d < min_dist) {
          leafLar.reached = true;
          closestBranchLar = null;
          break;
        } else if (d < record) {
          closestBranchLar = branchLar;
          record = d;
        }
      }

      if (closestBranchLar != null) {
        var newDir = p5.Vector.sub(leafLar.pos, closestBranchLar.pos);
        newDir.normalize();
        closestBranchLar.dir.add(newDir);
        closestBranchLar.count++;
      }
    }

    for (var i = this.leavesLar.length - 1; i >= 0; i--) {
      if (this.leavesLar[i].reached) {
      }
    }

    for (var i = this.branchesLar.length - 1; i >= 0; i--) {
      var branchLar = this.branchesLar[i];
      if (branchLar.count > 0) {
        branchLar.dir.div(branchLar.count + 1);
        this.branchesLar.push(branchLar.next());
        branchLar.reset();
      }
    }
  };

  this.show = function() {
    for (var i = 0; i < this.leavesLar.length; i++) {
      this.leavesLar[i].show();
    }

    for (var i = 0; i < this.branchesLar.length; i++) {
      this.branchesLar[i].show();
    }
  };
}
