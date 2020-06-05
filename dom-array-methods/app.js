// DOM elemenes
const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');
const showMillionariesBtn = document.getElementById('show-millionaries');
const sortBtn = document.getElementById('sort');
const calcTotalBtn = document.getElementById('calculate-wealth');

let data = [];

// Fetch random user and add mone
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Double Money
function doubleMoney() {
  data = data.map((user) => {
    return {
      ...user,
      money: user.money * 2,
    };
  });
  updateDOM();
}

// Sort by Richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// Show only millionaries
function showMillionaries() {
  data = data.filter((user) => user.money >= 1000000);
  updateDOM();
}

// Add new user to  data array
function addData(obj) {
  data.push(obj);
  updateDOM();
}

// Calculate total wealth
function calcTotal() {
  const wealth = data.reduce((acc, user) => acc + user.money, 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;

  main.appendChild(wealthEl);
}

// Update DOM
function updateDOM(providedData = data) {
  // Clearr main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format money number
function formatMoney(num) {
  return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
addUser.addEventListener('click', getRandomUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionariesBtn.addEventListener('click', showMillionaries);
calcTotalBtn.addEventListener('click', calcTotal);
