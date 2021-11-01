var batteries = 0;
var multiplier = 1;
var bps = 0;

var batStat = document.getElementById("Batteries");
var bpsStat = document.getElementById("bps");




function getValuesFromLocalStorage() {
  if (localStorage.getItem("BatteryClicker.batteries") != "null") {
    batteries = parseFloat(localStorage.getItem("BatteryClicker.batteries"));
  }
  if (localStorage.getItem("BatteryClicker.multiplier") != "null") {
  multiplier = parseFloat(localStorage.getItem("BatteryClicker.multiplier"));
  }
  if (localStorage.getItem("BatteryClicker.bps") != "null"){
  bps = parseFloat(localStorage.getItem("BatteryClicker.bps"));
  }
  updateStats()
}

function updateStats() {
  batStat.innerHTML = Math.trunc(batteries);
  bpsStat.innerHTML = bps;

  localStorage.setItem("BatteryClicker.batteries", batteries);
  localStorage.setItem("BatteryClicker.multiplier", multiplier)
  localStorage.setItem("BatteryClicker.bps", bps)

}

function passiveIncome() {
  batteries += bps;
  updateStats()
}

function clicking() {
  batteries += multiplier;
  updateStats();
  return null;
}

class upgrade {
  constructor(name, elementId, startPrice, increment, boost ) {
    this.name = name;
    this.element = elementId;
    this.price = startPrice;
    this.prizeIncrement = increment;
    this.upgradeIncrement = boost;
  }

  buy(name) {
    
  }

}

let current = new upgrade(Current, document.getElementById("current"), 50, 5, 1 );