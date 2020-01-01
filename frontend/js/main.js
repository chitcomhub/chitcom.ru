function cardHTML (user,row, col) {
  /**
   * Summary.
   * This function populates cards with details about programmers
   * 
   * Description.
   * Each card will have such details as name, picture, skills, specialization and contact info
   * 
   * @user  json          User information received through an API-call to the backend
   * @row   DOM.element   New row is generated when two cards are written to the current row
   * @col   DOM.elemenet  Each row has two columns which will contain Cards
   */
  
  let htmlCard = `
      <div class="card flex-md-row mb-4 box-shadow h-md-250">
        <img class="card-img-left flex-auto d-none d-md-block" src="../img/pictures/efive.jpg" style="width: 200px; height: 250px;">
        <div class="card-body d-flex flex-column align-items-start">
          <h3 class="mb-0">${user.director}</h3>
        
          <div class="mb-1 text-muted">${user.title}</div>
          <p class="card-text mb-auto">${user.description.substring(0, 150)}</p>
          <strong class="d-inline-block mb-2 text-primary" style="font-size: xx-large;">
            <i class="devicon-python-plain-wordmark"></i>
          </strong>
        </div>
      </div>
    `

  col.innerHTML = htmlCard;

}

const getCards = async (url) => {
  try {
      const response = await fetch(url);
        if(response.ok){
          const jsonResponse = await response.json();
          generateHTMLForCards(jsonResponse);
        }
  }
  catch(error){
    console.log(error);
  }
}


function generateHTMLForCards(data){
  let count = 0;
  if (data){
      data.forEach(movie => {
        if (count %2 === 0) {
          var row = createElement('div');
          addClass(row, 'row mb-2')
          container.appendChild(row);
        } else {
          var row = container.lastChild;
          container.appendChild(row);
        }
        const col = createElement('div')
        addClass(col, 'col-md-6')
        row.appendChild(col);

        cardHTML(movie, row, col);
        
        count += 1
      });
    } else {
      const errorMessage = createElement('marquee');
      errorMessage.textContent = `Page couldnt load!`;
      app.appendChild(errorMessage);
    }
  }

  const app = getElemById('root');
  const container = app.childNodes[1];
  
  const url = 'https://ghibliapi.herokuapp.com/films';
  getCards(url);



//Supporting functions  
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