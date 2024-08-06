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
    data.sort((a, b) => b.wallet - a.wallet);
    table.className = 'striped';
      
    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    ["#", "Image", "Login", "Wallet", "Profile"].forEach(header => {
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
      td.textContent = object.wallet + " ₳";
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