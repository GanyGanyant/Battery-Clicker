var batteries = 0;
var multiplier = 1;
var bps = 0;

var batStat = document.getElementById("Batteries");
var bpsStat = document.getElementById("bps");


function loadValues() {
  if (localStorage.getItem("BatteryClicker.batteries") !== null) {
    batteries = parseFloat(localStorage.getItem("BatteryClicker.batteries"));
  }
  if (localStorage.getItem("BatteryClicker.multiplier") !== null) {
  multiplier = parseFloat(localStorage.getItem("BatteryClicker.multiplier"));
  }
  if (localStorage.getItem("BatteryClicker.bps") !== null){
  bps = parseFloat(localStorage.getItem("BatteryClicker.bps"));
  }
  upgrades.forEach(element => {
    element.loadValues();
  });
  passives.forEach(element => {
    element.loadValues();
  });
  updateStats();
}

function updateStats() {
  batStat.innerHTML = Math.trunc(batteries);
  bpsStat.innerHTML = bps;

  localStorage.setItem("BatteryClicker.batteries", batteries);
  localStorage.setItem("BatteryClicker.multiplier", multiplier)
  localStorage.setItem("BatteryClicker.bps", bps)
  
  upgrades.forEach(element => {
    element.update();
  });
  passives.forEach(element => {
    element.update();
  });
}

function passiveIncome() {
  batteries += bps;
  updateStats();
}

function clicking() {
  batteries += multiplier;
  updateStats();
  return null;
}

let upgrades = [];

class upgrade {
  
  constructor(name, startPrice, increment, boost ) 
  {
    this.name = name;
    this.element = document.getElementById(this.name);
    this.startPrice = startPrice;
    this.prizeIncrement = increment;
    this.upgradeIncrement = boost;
    this.level = 0;
    this.price = this.startPrice + this.level * this.prizeIncrement;
    upgrades.push(this);
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
    
  loadValues() {
    if (localStorage.getItem(this.name) !== null) {
      this.level = parseInt(localStorage.getItem(this.name));
    }
  }

  update() {
    this.price = this.startPrice + this.level * this.prizeIncrement;
    this.element.querySelector(".upgrade-price").innerHTML = this.price;
    localStorage.setItem(this.name, this.level);
    if (batteries >= this.price) {
      this.element.classList.remove("cannotBuy");
      this.element.classList.add("canBuy");
    }
    else {
      this.element.classList.remove("canBuy");
      this.element.classList.add("cannotBuy");
    }
  }


}

let current = new upgrade("current", 50, 50, 1 );
let voltage = new upgrade("voltage", 100, 100, 2 );

  let passives = [];

class passive {

  constructor(name, startPrice, increment, income )
  {
    this.name = name;
    this.element = document.getElementById(this.name);
    this.startPrice = startPrice;
    this.prizeIncrement = increment;
    this.passiveIncome = income;
    this.level = 0;
    this.price = this.startPrice + this.level * this.prizeIncrement;
    passives.push(this);
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

  loadValues() {
    if (localStorage.getItem(this.name) !== null) {
      this.level = parseInt(localStorage.getItem(this.name));
    }
  }

  update() {
    this.price = this.startPrice + this.level * this.prizeIncrement;
    this.element.querySelector(".passive-price").innerHTML = this.price;
    localStorage.setItem(this.name, this.level);
    if (batteries >= this.price) {
      this.element.classList.remove("cannotBuy");
      this.element.classList.add("canBuy");
    }
    else {
      this.element.classList.remove("canBuy");
      this.element.classList.add("cannotBuy");
    }
  }

}

let electricEel = new passive("electricEel", 50, 50, 1);

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