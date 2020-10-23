const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  data = document.querySelector('.day');

const dayWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const nameMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function setBG(timeOfDay, slogan) {
  const rand = Math.round(Math.random() * 20);
  greeting.textContent = slogan;
  return `url('./assets/images/${timeOfDay}/${addZero(rand)}.jpg')`;
}

function setBgGreet() {
  let today = new Date(),
    hour = today.getHours()
  if (hour < 6) {
    document.body.style.backgroundImage = setBG('night', 'Good Night, ');
  } else if (hour < 12) {
    document.body.style.backgroundImage = setBG('morning', 'Good Morning, ');
  } else if (hour < 18) {
    document.body.style.backgroundImage = setBG('day', 'Good Afternoon, ');
  } else {
    document.body.style.backgroundImage = setBG('evening', 'Good Evening, ');
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


name.addEventListener('focus', delName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('focus', delFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);


showTime();
setBgGreet();
getName();
getFocus();