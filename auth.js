function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function redirectToMainIfConnected() {
    const isConnected = getCookie("isConnected");
    if (isConnected) {
        window.location.href = "src/index.html";
    }
    else {
        setCookie("isConnected", "true", 1);
        localStorage.setItem('isConnected', 'true');
        window.location.href = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-8478757f7a8b61acce2e1bbabfbb611dd43c43ad3ffe85db957cf4da8692f91c&redirect_uri=https%3A%2F%2Fhaletran.github.io%2Fclassement.42angouleme%2Fsrc%2Findex.html&response_type=code";
    }
}

function connect() {
    redirectToMainIfConnected();
}
