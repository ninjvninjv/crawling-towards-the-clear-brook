var treeEph;
var tree;
var max_dist = 300;
var min_dist = 15;
var max_distLar = 50;
var min_distLar = 5;

var today = new Date();
var da = today.getDate() * 2.55;
var mo = today.getMonth() + 1;

if (mo <= 10) {
  min_dist = 250 - da;
} else if (mo === 11) {
  min_dist = 177 - da;
} else if (mo === 12){
  min_dist = 79 - da;
} else {
  min_dist = 10;
}

var ho = today.getHours();
var min_distEph = 120 - ho * 5;
var max_distEph = 300;

let videos = ["IMG_0313.gif", "IMG_1257.gif", "IMG-0461.gif", "IMG-0462.gif", "IMG-0937.gif", "IMG_0108.gif", "IMG-1173.gif", "IMG_0108.gif", "IMG-0233.gif"];
var nex = Math.round((7/23)* ho);
var hue = 50 + (200/30)* today.getDate();
var newSrc = videos[nex];
var video = document.getElementById('video');
video.style.filter = "blur(4px) hue-rotate("+ hue + "deg)";
video.src = newSrc;

function setup() {
  setTimeout(function(){
    createCanvas(windowWidth, windowHeight);
    frameRate(6);
    treeEph = new TreeEph();
    tree = new Tree();
  }, 3000);
}

function draw() {
  setTimeout(function(){
  tree.show();
  tree.grow();
  treeEph.grow();
}, 3000);
}
