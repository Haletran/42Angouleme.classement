const fs = require('fs');

const BASE_URL = "https://api.intra.42.fr";
const url_user = `${BASE_URL}/v2/users/`;
const { getToken } = require("./api.js");

async function get_user(login) {
    let access_token = await getToken();
    const options = { headers: { Authorization: `Bearer ${access_token}` } };
    let response = await fetch(`${url_user}${login}`, options);
    const data = await response.json();
    return data;
}

async function writetoFile(user, filename) {
    const data = {
        image_url: user.image.versions.small,
        login: user.login,
        level: user.cursus_users[1] ? user.cursus_users[1].level : user.cursus_users[0].level,
        intra: `https://profile.intra.42.fr/users/${user.login}`,
    };

    let dataArr;
    try {
        dataArr = JSON.parse(await fs.promises.readFile(filename, 'utf-8'));
    } catch (err) {
        dataArr = [];
    }

    dataArr.push(data);

    await fs.promises.writeFile(filename, JSON.stringify(dataArr, null, 2));
}

async function generateFile(loginFile, outputFile) {
    let logins = fs.readFileSync(`${loginFile}`).toString().split('\n');
    console.log(`Getting all users info for ${outputFile}...`);
    for (let i = 0; i < logins.length; i++) {
        let user = await get_user(logins[i]);
        if (user && user.login) {
            await writetoFile(user, outputFile);
        }
        await new Promise(resolve => setTimeout(resolve, 700));
    }
}

(async () => {
    await generateFile('generate_info/info/2023_login.json', 'generate_info/db/2023.json');
    await generateFile('generate_info/info/2022_login.json', 'generate_info/db/2022.json');
    await generateFile('generate_info/info/all_login.json', 'generate_info/db/all.json');
    if (fs.existsSync('generate_info/db/disco.json')) {
        fs.unlinkSync('generate_info/db/disco.json');
    }
    await generateFile('generate_info/info/disco.json', 'generate_info/db/disco.json');
    console.log('All files generated successfully!');
})();
