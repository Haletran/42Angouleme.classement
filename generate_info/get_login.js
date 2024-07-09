// Description: Get all logins from 42 API.

// LIBRARY
const fs = require('fs');

// VARIABLES
const BASE_URL = "https://api.intra.42.fr";
const url_all = `${BASE_URL}/v2/campus/31/users?per_page=150`;
const url_2023 = `${BASE_URL}/v2/campus/31/users?per_page=150&filter[pool_year]=2023`;
const url_2022 = `${BASE_URL}/v2/campus/31/users?per_page=150&filter[pool_year]=2022`;
const url_2024 = `${BASE_URL}/v2/campus/31/users?per_page=150&filter[pool_year]=2024&filter[pool_month]=july`;
const { getToken } = require("./api.js");

// FUNCTIONS
async function user_login(url) {
    let allUsers = [];
    let page = 1;
    let access_token = await getToken();
    const options = { headers: { Authorization: `Bearer ${access_token}` } };
    let activeUsers;
    do
    {
        let response;
        while (true) {
            response = await fetch(`${url}&page=${page}`, options);
            if (response.status !== 429) {
                break;
            }
            console.log('Rate limit exceeded, waiting for 1 second...');
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        const data = await response.json();
        activeUsers = data.filter((user) => user["active?"] && !user["staff?"] && user.kind == "student");
        allUsers = [...allUsers, ...activeUsers];
        page++;
        await new Promise((resolve) => setTimeout(resolve, 700));
    } while (activeUsers.length > 0);
    console.log(`All logins of ${url} have been fetched.`);
    return allUsers;
}

async function writeLoginsToFile(users, filename) {
    for (let i = 0; i < users.length; i++) {
        console.log(users[i].login);
        fs.appendFile(filename, users[i].login + '\n', (err) => {
            if (err) throw err;
        });
    }
    console.log(`-> Data has been written to ${filename}`);
}

(async () => {
    console.log("Getting all logins...");
    const [users2024] = await Promise.all([
        //user_login(url_2023),
        //user_login(url_2022),
        //user_login(url_all),
        user_login(url_2024),
    ]);


    //await writeLoginsToFile(users2023, '2023_login.json');
    //await writeLoginsToFile(users2022, '2022_login.json');
    //await writeLoginsToFile(usersAll, 'all_login.json');
    await writeLoginsToFile(users2024, 'july.json');
})();