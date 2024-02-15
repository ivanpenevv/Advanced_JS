let currentPage = 1;

function getPlanets() {
  fetch(`https://swapi.dev/api/planets/?page=1`)
    .then(response => response.json())
    .then(data => {
      displayPlanets(data.results);
      toggleNextPrevButtons(data.next, data.previous);
    })
    .catch(error => console.error('Error fetching planets:', error));
}

function displayPlanets(planets) {
  const planetsBody = document.getElementById('planetsBody');
  planetsBody.innerHTML = '';

  planets.forEach(planet => {
    const row = planetsBody.insertRow();
    row.insertCell(0).innerText = planet.name;
    row.insertCell(1).innerText = planet.population;
    row.insertCell(2).innerText = planet.climate;
    row.insertCell(3).innerText = planet.gravity;
  });
}

function toggleNextPrevButtons(next, prev) {
  const nextButton = document.getElementById('nextButton');
  const prevButton = document.getElementById('prevButton');

  if (next) {
    nextButton.style.display = 'inline-block';
    nextButton.setAttribute('data-url', next);
  } else {
    nextButton.style.display = 'none';
  }

  if (prev) {
    prevButton.style.display = 'inline-block';
    prevButton.setAttribute('data-url', prev);
  } else {
    prevButton.style.display = 'none';
  }
}

function getNextPlanets() {
    fetch(`https://swapi.dev/api/planets/?page=2`)
    const nextUrl = document.getElementById('nextButton').getAttribute('data-url');
    if (nextUrl) {
      currentPage++;
      fetch(nextUrl)
        .then(response => response.json())
        .then(data => {
          displayPlanets(data.results);
          toggleNextPrevButtons(data.next, data.previous);
        })
        .catch(error => console.error('Error fetching planets:', error));
    }
  }
  
  function getPreviousPlanets() {
    const prevUrl = document.getElementById('prevButton').getAttribute('data-url');
    if (prevUrl) {
      currentPage--;
      fetch(prevUrl)
        .then(response => response.json())
        .then(data => {
          displayPlanets(data.results);
          toggleNextPrevButtons(data.next, data.previous);
        })
        .catch(error => console.error('Error fetching planets:', error));
    }
  }