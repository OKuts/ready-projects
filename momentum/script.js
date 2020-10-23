const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  data = document.querySelector('.day');

const dayWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const nameMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const btn = document.querySelector('.btn');
let countBG = new Date().getHours();
let tempName, tempFocus;

function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    month = today.getMonth(),
    date = today.getDate(),
    day = today.getDay();
  if ((!hour && !min && !sec) || !data.innerText) data.innerHTML = `<span>${dayWeek[day]} ${date} ${nameMonth[month]}</span>`;
  if (hour === hour + min + sec) setBgGreet();
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function setBG(hour) {
  hour = hour < 10 ? `0${+hour}` : +hour;
  document.body.style.backgroundImage = `url('./assets/images/${hour}.jpg')`;
}

function setBGButton() {
  // hour = hour < 10 ? `0${+hour}` : +hour;
  // document.body.style.backgroundImage = `url('./assets/images/${hour}.jpg')`;
}

function setBgGreet(btn) {
  let today = new Date(),
    hour = today.getHours()
  if (hour < 6) {
    greeting.textContent = 'Good Night, ';
    setBG(hour);
  } else if (hour < 12) {
    greeting.textContent = 'Good Morning, ';
    setBG(hour);
  } else if (hour < 18) {
    greeting.textContent = 'Good Afternoon, ';
    setBG(hour);
  } else {
    greeting.textContent = 'Good Evening, ';
    setBG(hour);
    document.body.style.color = 'white';
  }
}

function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

function setName(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      e.target.innerText ? localStorage.setItem('name', e.target.innerText) : name.textContent = tempName;
      tempName = '';
      name.blur();
    }
  }
}

function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

function setFocus(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      e.target.innerText ? localStorage.setItem('focus', e.target.innerText) : focus.textContent = tempFocus;
      tempFocus = '';
      focus.blur();
    }
  }
}

function delName() {
  tempName = name.textContent;
  name.textContent = '';
  name.style.width = '200px';
}

function delFocus() {
  tempFocus = focus.textContent;
  focus.textContent = '';
  focus.style.width = '300px';
}
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');

async function getQuote() {
  // const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  // const res = await fetch(url);
  // const data = await res.json();
  // blockquote.textContent = data.quoteText;
  // figcaption.textContent = data.quoteAuthor;
}

name.addEventListener('focus', delName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('focus', delFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
btn.addEventListener('click', function () {
  countBG === 23 ? countBG = 0 : countBG++;
  setBG(countBG);
});

showTime();
setBgGreet();
getName();
getFocus();

document.addEventListener('DOMContentLoaded', getQuote);