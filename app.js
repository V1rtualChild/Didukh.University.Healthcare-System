const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config({ path: './.env' });

const app = express();

// Ініціалізація з'єднання з базою даних
let db;

if (process.env.DATABASE_HOST && process.env.DATABASE_USER && process.env.DATABASE_PASSWORD && process.env.DATABASE) {
    db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE
    });

    db.connect((error) => {
        if (error) {
            console.error("Error connecting to the database:", error);
            console.log("Continuing without database connection...");
        } else {
            console.log("MySQL Connected...");
        }
    });
} else {
    console.log("Database connection not configured. Running without database.");
}

const authController = require('./controllers/auth');

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'hbs');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

app.post('/auth/register', (req, res) => {
    if (db) {
        authController.register(db, req, res); // Передача db, якщо підключення до бази є
    }

    const { email } = req.body;
    const mailOptions = {
        from: 'healthcare.system.auth@gmail.com',
        to: email,
        subject: 'HealthCare System Registration',
        html: `
            <h1>Вітаємо з реєстрацією у HealthCare System!</h1>
            <p>Шановний користувач,</p>
            <p>Ми раді вітати вас в нашій системі. Ви тепер можете користуватися всіма можливостями HealthCare System.</p>
            <p>Бажаємо вам приємного користування нашим сервісом!</p>
            <p>З повагою,</p>
            <p>Команда HealthCare System</p>
            <br>
            <h2>English version</h2>
            <h1>Congratulations on your registration in the HealthCare System!</h1>
            <p>Dear user,</p>
            <p>We are glad to welcome you to our system. You can now use all the features of the HealthCare System.</p>
            <p>We wish you a pleasant use of our service!</p>
            <p>Best regards,</p>
            <p>Team HealthCare System</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.redirect('/profile'); // Перенаправлення на /profile після успішної реєстрації
        }
    });
});

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
