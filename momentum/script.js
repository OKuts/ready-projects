const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  data = document.querySelector('.day'),
  town = document.querySelector('.town');

const dayWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const nameMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const btn = document.querySelector('.btn');
let countBG = new Date().getHours();
let tempName, tempFocus, tempTown;

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

function setBG(hour, folder) {
  hour = localStorage.getItem('listImg').split(',')[hour];
  hour = hour < 10 ? `0${+hour}` : +hour;
  const img = document.createElement('img');
  img.src = `./assets/images/${folder}/${hour}.jpg`;
  img.onload = () => {
    document.body.style.backgroundImage = `url('${img.src}')`;
  };
}

function getFolderImg(hour) {
  if (hour < 6) return ['night', 'Good Night, '];
  else if (hour < 12) return ['morning', 'Good Morning, '];
  else if (hour < 18) return ['day', 'Good Afternoon, '];
  else return ['evening', 'Good Evening, '];
}

function setBgGreet(btn) {
  let today = new Date(),
    hour = today.getHours();
  const [folder, greet] = getFolderImg(hour);
  greeting.textContent = greet;
  setBG(hour, folder);
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
      if (e.target.innerText) {
        localStorage.setItem('name', e.target.innerText);
        tempName = e.target.innerText;
      } else name.textContent = tempName;
      name.blur();
    }
  } else {
    name.textContent = tempName;
  }
}

function getTown() {
  if (localStorage.getItem('town') === null) {
    town.textContent = '[Enter Your Town]';
  } else {
    town.textContent = localStorage.getItem('town');
  }
}

function setTown(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText) {
        tempTown = e.target.innerText;
        weather(town.textContent)
      } else town.textContent = tempTown;
      town.blur();
    }
  } else {
    town.textContent = tempTown;
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
      if (e.target.innerText) {
        localStorage.setItem('focus', e.target.innerText);
        tempFocus = e.target.innerText;
      } else focus.textContent = tempFocus;
      focus.blur();
    }
  } else {
    focus.textContent = tempFocus;
  }
}

function delName() {
  tempName = name.textContent;
  name.textContent = '';
  name.style.minWidth = '100px';
}

function delFocus() {
  tempFocus = focus.textContent;
  focus.textContent = '';
  focus.style.minWidth = '300px';
}

function delTown() {
  tempTown = town.textContent;
  town.textContent = '';
  town.style.minWidth = '100px';
}
// ---------------------------------------------------------------------------------------
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');

async function getQuote() {
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json();
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}
// ---------------------------------------------------------------------------------------
function setListImg() {
  let temp;
  const listImg = [[], [], [], []];
  const currentDate = new Date().getDate();
  if (localStorage.getItem('currentDate') === null || localStorage.getItem('currentDate') != currentDate) {
    listImg.forEach(el => {
      let i = 0;
      while (i < 6) {
        temp = Math.round(Math.random() * 19 + 1);
        if (!el.includes(temp)) {
          el.push(temp);
          i++;
        }
      }
    })
    localStorage.setItem('listImg', listImg);
    localStorage.setItem('currentDate', currentDate);
  }
}

function weather(sity) {
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${sity}&appid=b983ca3b97b2387c3d05e06b56c1f579&units=metric`)
    .then(function (resp) {
      return resp.json()
    })
    .then(function (data) {
      console.log(data.list[0])
      let icon = data.list[0].weather[0].icon;
      document.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png">`;
      document.querySelector('.temperature').innerHTML = 't ' + Math.round(data.list[0].main.temp) + '&deg;';
      document.querySelector('.humidity').innerHTML = data.list[0].main.humidity + '%';
      document.querySelector('.wind1').style.transform = `rotate(${data.list[0].wind.deg + 90}deg)`;
      document.querySelector('.speed').textContent = `${data.list[0].wind.speed} m/s`;
      document.querySelector('.block-weather').style.display = 'flex';
      localStorage.setItem('town', sity);

    })
    .catch(function () {
      document.querySelector('.town-error').textContent = "Error Town";
      document.querySelector('.town').textContent = tempTown;
      setTimeout(() => {
        document.querySelector('.town-error').textContent = '';
        town.textContent = localStorage.getItem('town') || '[Enter Your Town]';
      }, 2000);
    })
}


// ---------------------------------------------------------------------------------------
name.addEventListener('focus', delName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('focus', delFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
town.addEventListener('focus', delTown);
town.addEventListener('keypress', setTown);
town.addEventListener('blur', setTown);
btn.addEventListener('click', function () {
  countBG === 23 ? countBG = 0 : countBG++;
  setBG(countBG, getFolderImg(countBG)[0]);
});

showTime();
setListImg();
setBgGreet();
getName();
getFocus();
getTown();
if (town.textContent) weather(town.textContent);


document.addEventListener('DOMContentLoaded', getQuote);