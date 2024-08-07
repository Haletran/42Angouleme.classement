const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const PORT = process.env.PORT || 3000;
const config = require('./config');
const session = require('express-session');
const fs = require('fs');

function isUserWhitelisted(userId) {
    try {
        const data = fs.readFileSync('whitelist.json');
        const whitelist = data.toString().split('\n').filter(Boolean);
        return whitelist.includes(userId);
    } catch (error) {
        console.error('Error reading whitelist file:', error);
        return false;
    }
}

app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.get('/', (req, res) => {
    if (req.session.accessToken) {
        return res.redirect('/classement');
    }
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/auth', async (req, res) => {
    const code = req.query.code;
    try {
        const response = await axios.post('https://api.intra.42.fr/oauth/token', {
            grant_type: 'authorization_code',
            client_id: config.CLIENT_ID,
            client_secret: config.CLIENT_SECRET,
            redirect_uri: config.REDIRECT_URI,
            code: code,
        });
        const accessToken = response.data.access_token;
        if (!accessToken) {
            throw new Error('No access token');
        }
        const me = await axios.get('https://api.intra.42.fr/v2/me', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        if (me.status !== 200) {
            throw new Error('Invalid token');
        }
        if (me.data.pool_year >= 2024) {
            throw new Error('Not allowed to access');
        }
        if (!isUserWhitelisted(me.data.login)) {
            throw new Error('User not whitelisted');
        }
        req.session.accessToken = accessToken;
        res.redirect('/classement');
    } catch (error) {
        console.error('Error exchanging token:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/trombinoscope', (req, res) => {
    if (!req.session.accessToken) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, '../client/pages/trombinoscope.html'));
});

app.get('/classement', (req, res) => {
    if (!req.session.accessToken) {
        return res.redirect('/');
    }
    const year = req.query.year;
    if (year == 2022)
        res.sendFile(path.join(__dirname, '../client/pages/2022ranks.html'));
    else if (year == 2023)
        res.sendFile(path.join(__dirname, '../client/pages/2023ranks.html'));
    else if (year == "POOL")
        res.sendFile(path.join(__dirname, '../client/pages/poolranks.html'));
    else if (year == "coco")
        res.sendFile(path.join(__dirname, '../client/pages/points.html'));
    else if (year == "wallet")
        res.sendFile(path.join(__dirname, '../client/pages/wallet.html'));
    else
        res.sendFile(path.join(__dirname, '../client/pages/index.html'));
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to logout');
        }
        res.redirect('/');
    });
});

app.use(express.static(path.join(__dirname, '../client')));

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
