const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = async (req, res) => {
    console.log(req.body);

    const { name, email, password, passwordConfirm } = req.body;

    try {
        const results = await new Promise((resolve, reject) => {
            db.query('SELECT email FROM users WHERE email = ?', [email], (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });

        if (results.length > 0) {
            return res.render('register', {
                message: 'That email is already in use'
            });
        } else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error);
                return res.render('register', {
                    message: 'Error registering user'
                });
            } else {
                console.log(results);
                // !!! Перенаправлення на іншу сторінку >>>>>>>
                return res.redirect('/success-page');
            }
        });
    } catch (error) {
        console.error(error);
        return res.render('register', {
            message: 'Internal server error'
        });
    }
};
