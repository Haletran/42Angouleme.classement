let urls = ["../generate_info/db/2022.json", "../generate_info/db/2023.json"];
let date = ["2022", "2023"];

async function fetchData() {
  for (let i = 0; i < urls.length; i++) {
    try {
      let response = await fetch(urls[i]);
      let data = await response.json();

      let div = document.createElement('article');
      div.className = 'grid';
      let h2 = document.createElement('h2');
      h2.textContent = `PROMO ${date[i]}`;
      h2.className = 'promo';

      div.appendChild(h2);

      data.forEach(object => {
        let imgDiv = document.createElement('div');
        imgDiv.className = 'imgDiv';

        let img = document.createElement('img');
        img.src = object.image_url;
        img.alt = object.login;
        img.title = object.login;
        img.className = 'myImageClass';
        img.onclick = function() {
          window.open(object.intra, '_blank');
        }
        imgDiv.appendChild(img);

        div.appendChild(imgDiv);
      });

      document.getElementById('results').appendChild(div);

      let hr = document.createElement('hr');
      document.getElementById('results').appendChild(hr);
    } catch (error) {
      console.error('Erreur:', error);
    }
  }
}

fetchData();