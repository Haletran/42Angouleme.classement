// Supposons que vous ayez un fichier JSON à l'URL suivante
let url = "../generate_info/db/2023.json";

let userLogin = localStorage.getItem('user');
if (userLogin) {
  userLogin = userLogin.replace(/"/g, '');
}

fetch(url)
  .then(response => response.json())
  .then(data => {
    let table = document.createElement('table');
    data.sort((a, b) => b.level - a.level);
    table.className = 'striped';

    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    ["#", "Image", "Login", "Level", "Profile"].forEach(header => {
      let th = document.createElement('th');
      th.textContent = header;
      th.scope = "col";
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    let tbody = document.createElement('tbody');
    data.forEach((object, index) => {
      let row = document.createElement('tr');
      let td = document.createElement('td');
      td.textContent = index + 1;
      row.appendChild(td);

      if (index < 3) {
        if (index == 0) {
          td.textContent = "🥇";
        }
        else if (index == 1) {
          td.textContent = "🥈";
        }
        else if (index == 2) {
          td.textContent = "🥉";
        }
      }

      td = document.createElement('td');
      let img = document.createElement('img');
      img.src = object.image_url;
      img.alt = "Profile Picture";
      td.appendChild(img);
      row.appendChild(td);

      td = document.createElement('td');
      if (object.location === null) {
        td.innerHTML = object.login + "<span class='badge'>" + "<br><br>" + "<kbd id='unavailable'><ion-icon name='ellipse' style='color:#D93526; z-index: 1;' ></ion-icon> Unavailable</kbd>" + "</span>";
      }
      else 
        td.innerHTML = object.login + " <span class='badge'>" + "<br><br>" + "<kbd id='available'><ion-icon name='ellipse' style='color:#5DD121; z-index: 1;' ></ion-icon> " +  object.location + "</kbd></span>";
      row.appendChild(td);

      td = document.createElement('td');
      td.textContent = object.level;
      row.appendChild(td);

      td = document.createElement('td');
      let a = document.createElement('a');
      a.href = object.intra;
      a.target = "_blank";
      a.textContent = "View Profile";
      td.appendChild(a);
      row.appendChild(td);


      if (object.login === userLogin) {
        row.className = 'user-row';
        row.style.border = '3px solid rgb(1, 127, 192)';
      }
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    document.getElementById('results').appendChild(table);
  })
  .catch(error => console.error('Erreur:', error));