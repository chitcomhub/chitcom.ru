function teamCard(user, row) {
  const col = createElement('div');
  addClass(col, 'col-md-6')

  const card = createElement('div');
  addClass(card, 'card flex-md-row mb-4 box-shadow h-md-250')

  const image = createElement('img');
  addClass(image, 'card-img-left flex-auto d-none d-md-block')
  image.src = '../img/pictures/efive.jpg';
  addStyle(image, 'width: 200px; height: 250px;')
  
  const cardBody = createElement('div');
  addClass(cardBody, 'card-body d-flex flex-column align-items-start')

  const h3 = createElement('h3');
  addClass(h3, 'mb-0')
  h3.textContent = user.director;

  const specialization = createElement('div');
  addClass(specialization, 'mb-1 text-muted')
  specialization.textContent = user.title;

  const shortBio = createElement('p');
  addClass(shortBio, 'card-text mb-auto')
  user.description = user.description.substring(0, 150);
  shortBio.textContent = `${user.description}...`;

  const skill = createElement('strong');
  addClass(skill, 'd-inline-block mb-2 text-primary')
  addStyle(skill, 'font-size: xx-large;')
  
  const skillIcon = createElement('i');
  addClass(skillIcon, 'devicon-python-plain-wordmark')

  row.appendChild(col);
  col.appendChild(card);
  card.appendChild(image);
  card.appendChild(cardBody);
  cardBody.appendChild(h3);
  cardBody.appendChild(specialization);
  cardBody.appendChild(shortBio);
  cardBody.appendChild(skill);
  skill.appendChild(skillIcon);

}

const app = getElemById('root');
const container = app.childNodes[1];

var request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {
  var data = JSON.parse(this.response);
  var count = 0;
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      if (count %2 === 0) {
        var row = createElement('div');
        addClass(row, 'row mb-2')
        container.appendChild(row);
      } else {
        var row = container.lastChild;
        container.appendChild(row);
      }
      teamCard(movie, row);
      count += 1
    });
  } else {
    const errorMessage = createElement('marquee');
    errorMessage.textContent = `Page couldnt load!`;
    app.appendChild(errorMessage);
  }
}

request.send();

function addStyle(el, stl) {
  return el.style = stl
}

function addClass(el, cls) {
  return el.className = cls
}

function getElemById(el) {
  return document.getElementById(el);
}

function createElement(el) {
  return document.createElement(el)
}

function log(el) {
  console.log(el)
}