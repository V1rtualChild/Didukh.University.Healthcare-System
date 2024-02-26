const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Обробник для сторінки реєстрації
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    // Додати код для збереження інформації про користувача у базу даних
    res.send('Registration successful!');
});

// Обробник для сторінки входу
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Додати код для перевірки введених даних та аутентифікації користувача
    res.send('Login successful!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
