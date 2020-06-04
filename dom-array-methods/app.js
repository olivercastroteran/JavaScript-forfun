// DOM elemenes
const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const doubleMoney = document.getElementById('double');
const showMillionaries = document.getElementById('showmillionaries');
const sort = document.getElementById('sort');
const total = document.getElementById('calculate-wealth');

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

// Add new user to  data array
function addData(obj) {
  data.push(obj);
  updateDOM();
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
