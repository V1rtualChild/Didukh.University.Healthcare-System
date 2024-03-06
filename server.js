const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Встановлюємо шлях до кореневої папки вашого проекту
const publicDirectoryPath = path.join(__dirname, '');

// Встановлюємо Express, щоб він відображав вміст вашого проекту
app.use(express.static(publicDirectoryPath));
app.use(bodyParser.urlencoded({ extended: true }));

// Маршрут для головної сторінки
app.get('/', (req, res) => {
    // Відправляємо файл "index.html" як відповідь
    res.sendFile(path.join(publicDirectoryPath, 'index.html'));
});

// Маршрут для обробки входу
app.get('/signin', (req, res) => {
    // Тут можна додати логіку для обробки входу перед перенаправленням на Google OAuth
    // Наприклад, збереження стану або інших параметрів у сеансі користувача перед перенаправленням
    // Наприклад, зберегти значення стану у сеансі користувача
    req.session.state = 'some_state_value';

    // Збереження URL-адреси, яку користувач запитував до входу
    req.session.returnTo = req.query.returnTo || '/';

    // Перенаправлення на Google OAuth
    res.redirect('/oauth/google');
});


// Маршрут для перенаправлення на Google OAuth
app.get('/oauth/google', (req, res) => {
    let oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    let params = {
        "client_id": "89192876707-q61vsvn6utggb1v0qkt870gcg6h9mjl7.apps.googleusercontent.com",
        "redirect_uri": "http://127.0.0.1:3000/profile.html",
        "response_type": "token",
        "scope": "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube.readonly",
        "include_granted_scopes": 'true',
        'state': 'pass-through-value'
    };

    let queryString = new URLSearchParams(params).toString();
    let redirectUrl = `${oauth2Endpoint}?${queryString}`;
    res.redirect(redirectUrl);
});

// Запускаємо сервер
app.listen(port, () => {
    console.log(`Сервер запущено на порті ${port}`);
});
