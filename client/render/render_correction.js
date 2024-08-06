let url = "../generate_info/db/all.json";
let totalPoints = 0;
let userLogin = localStorage.getItem('user');
if (userLogin) {
  userLogin = userLogin.replace(/"/g, '');
}

fetch(url)
  .then(response => response.json())
  .then(data => {

    let table = document.createElement('table');
    data.sort((a, b) => b.correction_point - a.correction_point);
    table.className = 'striped';

    data.forEach(object => {
        totalPoints += object.correction_point;
      });

      let totalPointsElement = document.createElement('p');
      totalPointsElement.textContent = "POOL : " + totalPoints + " / " + data.length * 5;
      
      let italicTextElement = document.createElement('span');
      italicTextElement.textContent = ' (nb of active users * 5)';
      italicTextElement.style.fontStyle = 'italic';
      italicTextElement.style.fontSize = '0.7em';
      
      totalPointsElement.appendChild(italicTextElement);
      document.getElementById('total').appendChild(totalPointsElement);

    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    ["#", "Image", "Login", "Correction Point", "Profile"].forEach(header => {
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

      td = document.createElement('td');
      let img = document.createElement('img');
      img.src = object.image_url;
      img.alt = "Profile Picture";
      td.appendChild(img);
      row.appendChild(td);

      td = document.createElement('td');
      td.textContent = object.login;
      row.appendChild(td);

      td = document.createElement('td');
      td.textContent = object.correction_point;
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