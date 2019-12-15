function teamCard(user, row) {
  const col = createElement('div');
  col.className =  'col-md-6';

  const card = createElement('div');
  card.className = 'card flex-md-row mb-4 box-shadow h-md-250';

  const image = createElement('img');
  image.className = 'card-img-left flex-auto d-none d-md-block';
  image.src = './img/pictures/efive.jpg';
  image.style = 'width: 200px; height: 250px;';
  
  const cardBody = createElement('div');
  cardBody.className =  'card-body d-flex flex-column align-items-start';

  const h3 = createElement('h3');
  h3.className =  'mb-0';
  h3.textContent = user.director;

  const specialization = createElement('div');
  specialization.className =  'mb-1 text-muted';
  specialization.textContent = user.title;

  const shortBio = createElement('p');
  shortBio.className =  'card-text mb-auto';
  user.description = user.description.substring(0, 150);
  shortBio.textContent = `${user.description}...`;

  const skill = createElement('strong');
  skill.className = 'd-inline-block mb-2 text-primary';
  skill.style = 'font-size: xx-large;';
  
  const skillIcon = createElement('i');
  skillIcon.className =  'devicon-python-plain-wordmark';

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
        row.className =  'row mb-2';
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

function getElemById(el) {
  return document.getElementById(el);
}

function createElement(el) {
  return document.createElement(el)
}

function log(el) {
  console.log(el)
}