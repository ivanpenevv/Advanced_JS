function getAstronauts() {
    const astronautList = document.getElementById('astronautList');
    astronautList.innerHTML = '';

    fetch('http://api.open-notify.org/astros.json')
      .then(response => response.json())
      .then(data => {
        const astronauts = data.people;

        astronauts.forEach(astronaut => {
          const listItem = document.createElement('li');
          listItem.textContent = astronaut.name;
          astronautList.appendChild(listItem);
        });
      })
      .catch(error => console.error('Error fetching astronauts:', error));
  }