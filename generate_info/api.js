const BASE_URL = "https://api.intra.42.fr";
const TOKEN_URL = `${BASE_URL}/oauth/token`;
const CLIENT_ID = ;
const CLIENT_SECRET = ;
const TOKEN_DATA = `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

async function getToken() {
  try {
    const response = await fetch(TOKEN_URL, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: TOKEN_DATA,
    });
    const data = await response.json();
    return data.access_token;
  } catch (error) {
        console.error("Error:", error);
  }
}

module.exports.getToken = getToken;
