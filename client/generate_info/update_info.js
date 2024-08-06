const fs = require('fs');

const BASE_URL = "https://api.intra.42.fr";
const url_user = `${BASE_URL}/v2/users/`;
const { getToken } = require("./api.js");
const readline = require('readline');

async function get_user(login) {
    let access_token = await getToken();
    const options = { headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" }};
    let response = await fetch(`${url_user}${login}`, options);
    const data = await response.json();
    return data;
}

let totalCorrectionPoints = 0;
let level_moyenne = 0;

async function writetoFile(user, filename) {

    let projectName = 'C Piscine Exam 00';
    let project = user.projects_users.find(project => project.project.name === projectName);

    const data = {
        image_url: user.image.versions.small,
        image_url_medium: user.image.versions.medium,
        login: user.login,
        level: user.cursus_users[1] ? user.cursus_users[1].level : user.cursus_users[0].level,
        intra: `https://profile.intra.42.fr/users/${user.login}`,
        correction_point : user.correction_point,
        wallet : user.wallet,
        location : user.location,
    };

    if (filename === 'generate_info/db/aug.json') {
        data.exam = project ? project.final_mark : 0;
        projectName = 'C Piscine Rush 00';
        project = user.projects_users.find(project => project.project.name === projectName);
        data.rush00 = project ? project.final_mark : 0;
        projectName = 'C Piscine Exam 01';
        project = user.projects_users.find(project => project.project.name === projectName);
        data.exam1 = project ? project.final_mark : 0;
        projectName = 'C Piscine Exam 02';
        project = user.projects_users.find(project => project.project.name === projectName);
        data.exam2 = project ? project.final_mark : 0;
        projectName = 'C Piscine Rush 01';
        project = user.projects_users.find(project => project.project.name === projectName);
        data.rush01 = project ? project.final_mark : 0;
        projectName = 'C Piscine Rush 02';
        project = user.projects_users.find(project => project.project.name === projectName);
        data.rush01 = project ? project.final_mark : 0;
        projectName = 'C Piscine Exam 03';
        project = user.projects_users.find(project => project.project.name === projectName);
        data.exam03 = project ? project.final_mark : 0;
    }


    totalCorrectionPoints += user.correction_point;
    level_moyenne += data.level;
    
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
    totalCorrectionPoints = 0;
    level_moyenne = 0;
    let logins = fs.readFileSync(`${loginFile}`).toString().split('\n');
    console.log(`Getting all users info for ${outputFile}...`);
    for (let i = 0; i < logins.length; i++) {
        let user = await get_user(logins[i]);
        if (user && user.login)
        {
            await writetoFile(user, outputFile);
            printProgress(i, logins.length);
        }
        await new Promise(resolve => setTimeout(resolve, 800));
    }
    level_moyenne /= logins.length;
}

function printProgress(current, total) {
    const length = 30;
    const position = Math.floor((current / total) * length);
    let progressBar = '[' + '#'.repeat(position) + '-'.repeat(length - position) + ']';
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0, null);
    if (current === total - 1) {
        process.stdout.write(`Progress: ${progressBar} (${current + 1}/${total}) DONE ✅\r\n`);
    } else {
        process.stdout.write(`Progress: ${progressBar} (${current + 1}/${total})\r`);
    }
}

(async () => {

    if (fs.existsSync('generate_info/db/2023.json')) {
        fs.unlinkSync('generate_info/db/2023.json');
    }

    if (fs.existsSync('generate_info/db/2022.json')) {
        fs.unlinkSync('generate_info/db/2022.json');
    }

    if (fs.existsSync('generate_info/db/all.json')) {
        fs.unlinkSync('generate_info/db/all.json');
    }

    if (fs.existsSync('generate_info/db/aug.json')) {
        fs.unlinkSync('generate_info/db/aug.json');
    }
        

    await generateFile('generate_info/info/2023_login.json', 'generate_info/db/2023.json');
    await generateFile('generate_info/info/2022_login.json', 'generate_info/db/2022.json');
    await generateFile('generate_info/info/all_login.json', 'generate_info/db/all.json');
    await generateFile('generate_info/info/aug_login.json', 'generate_info/db/aug.json');
    await fs.promises.appendFile('generate_info/data_store/levelmoyenne.json', `${level_moyenne}` + "\n");
    await fs.promises.appendFile('generate_info/data_store/totalCorrectionPoints.json', `${totalCorrectionPoints}` + "\n");

    console.log('\x1b[32m%s\x1b[0m', 'All files generated successfully!');
})();
