var batteries = 0;
var mutliplier = 1;
var bps = 0;

var batStat = document.getElementById("Batteries");
var bpsStat = document.getElementById("bps");


function click() {
  batteries += mutliplier;
  updateStats();
  return null;
}

function updateStats() {
  batStat.innerHTML = Math.trunc(batteries);
  bpsStat.innerHTML = bps;
}