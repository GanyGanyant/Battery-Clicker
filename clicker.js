var batteries = 0;
var multiplier = 1;
var bps = 0;

var batStat = document.getElementById("Batteries");
var bpsStat = document.getElementById("bps");


function getValuesFromLocalStorage() {
  if (localStorage.getItem("BatteryClicker.batteries") != "NaN") {
    batteries = parseFloat(localStorage.getItem("BatteryClicker.batteries"));
  }
  if (localStorage.getItem("BatteryClicker.multiplier") != "NaN") {
  multiplier = parseFloat(localStorage.getItem("BatteryClicker.multiplier"));
  }
  if (localStorage.getItem("BatteryClicker.bps") != "NaN"){
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
  
  constructor(name, elementId, startPrice, increment, boost ) 
  {
    this.name = name;
    this.element = elementId;
    this.startPrice = startPrice;
    this.prizeIncrement = increment;
    this.upgradeIncrement = boost;
    this.level = 0;
    this.price = this.startPrice + this.level * this.prizeIncrement;
  }
  
  buy() {
    this.price = this.startPrice + this.level * this.prizeIncrement;
    if(batteries >= this.price) {
      batteries -= this.price;
      multiplier += this.upgradeIncrement;
      this.level++;
      updateStats();
    }
  }
  
}

let current = new upgrade("Current", document.getElementById("current"), 50, 50, 1 );
let voltage = new upgrade("Voltage", document.getElementById("voltage"), 100, 100, 2 );

let upgrades = [current, voltage];

class passive {

  constructor(name, elementId, startPrice, increment, income )
  {
    this.name = name;
    this.element = elementId;
    this.startPrice = startPrice;
    this.prizeIncrement = increment;
    this.passiveIncome = income;
    this.level = 0;
    this.price = this.startPrice + this.level * this.prizeIncrement;
  }
  buy() {
    this.price = this.startPrice + this.level * this.prizeIncrement;
    if(batteries >= this.price) {
      batteries -= this.price;
      bps += this.passiveIncome;
      this.level++;
      updateStats();
    }
  }

}

let electricEel = new passive("Electric eel", document.getElementById("Electric eel"), 50, 50, 1);

let passives = [electricEel];

function statReset() {
  batteries = 0;
  multiplier = 1;
  bps = 0;
  upgrades.forEach(element => {
    element.level = 0
  });
  passives.forEach(element => {
    element.level = 0
  });
  updateStats();
}

