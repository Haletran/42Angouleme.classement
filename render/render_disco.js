// Supposons que vous ayez un fichier JSON à l'URL suivante
let url = "../generate_info/db/disco.json";

// Utilisez fetch pour récupérer les données
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Créez un tableau HTML avec la classe 'striped'
    let table = document.createElement('table');
    data.sort((a, b) => b.level - a.level);
    table.className = 'striped';

    // Créez l'en-tête du tableau
    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    ["#", "Profile", "Login", "Level", "Profile"].forEach(header => {
      let th = document.createElement('th');
      th.textContent = header;
      th.scope = "col";
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Créez le corps du tableau
    let tbody = document.createElement('tbody');
    data.forEach((object, index) => {
      let row = document.createElement('tr');


      // Ajoutez le numéro de la ligne
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

      // Ajoutez l'image du profil
      td = document.createElement('td');
      let img = document.createElement('img');
      img.src = object.image_url; // Modifiez cette ligne pour utiliser la clé correcte
      img.alt = "Profile Picture";
      td.appendChild(img);
      row.appendChild(td);

      // Ajoutez le login
      td = document.createElement('td');
      td.textContent = object.login; // Modifiez cette ligne pour utiliser la clé correcte
      row.appendChild(td);

      // Ajoutez le niveau
      td = document.createElement('td');
      td.textContent = object.level; // Modifiez cette ligne pour utiliser la clé correcte
      row.appendChild(td);

      // Ajoutez le lien vers le profil
      td = document.createElement('td');
      let a = document.createElement('a');
      a.href = object.intra; // Modifiez cette ligne pour utiliser la clé correcte
      a.target = "_blank";
      a.textContent = "View Profile";
      td.appendChild(a);
      row.appendChild(td);

      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    // Ajoutez le tableau à l'élément div#results
    document.getElementById('results').appendChild(table);
  })
  .catch(error => console.error('Erreur:', error));