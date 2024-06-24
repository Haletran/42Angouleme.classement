  // Sélectionnez l'élément de sélection
  var selectElement = document.getElementById('yearSelect');

  selectElement.addEventListener('change', function() {
    var year = selectElement.value;

    if (year === '2023') {
      window.location.href = '2023ranks.html';
    } else if (year === 'ALL') {
      window.location.href = 'index.html';
    } else if (year === '2022') {
      window.location.href = '2022ranks.html';
    } else if (year === 'DISCO')
      window.location.href = 'discoranks.html';
    
  });

  if (!localStorage.getItem('isConnected')) {
    window.location.href = "../index.html";
  }


  function getAuthorizationCodeFromURL() {
    const url = new URL(window.location.toString());
    const authorizationCode = url.searchParams.get('code');

    if (authorizationCode) {
        url.searchParams.delete('code');
        window.history.replaceState({}, document.title, url.toString());
    }
    return authorizationCode;
}

window.onload = function () {
  const authorizationCode = getAuthorizationCodeFromURL();
  if (authorizationCode) {
      fetch('', { // YOUR VERCEL LINK
          method: 'POST',
          body: JSON.stringify({ code: authorizationCode }),
          headers: { 'Content-Type': 'application/json' },
      })
          .then(response => response.json())
          .then(data => {
              const accessToken = data.access_token;
              localStorage.setItem('accessToken', accessToken);
              console.log('Access token:', accessToken);
          });
  } else {
      console.log('No authorization code found');
  }
}