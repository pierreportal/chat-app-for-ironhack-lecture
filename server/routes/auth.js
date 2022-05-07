const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');


router.post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    User.findOne({ username: username })
        .then(found => {
            if (found !== null) {
                return res.status(400).json({ message: 'The username has already an associated account' });
            } else {
                const salt = bcrypt.genSaltSync();
                const hash = bcrypt.hashSync(password, salt);

                User.create({
                    username,
                    password: hash
                })
                    .then(dbUser => {
                        req.login(dbUser, err => {
                            if (err) {
                                return res.status(500).json({ message: 'Error while attempting to login' })
                            }
                            return res.status(200).json(dbUser);
                        });
                    })
                    .catch(err => {
                        res.json(err);
                    })
            }
        })
})

router.post('/login', (req, res, next) => {

    passport.authenticate('local', (err, user) => {
        console.log('test local')
        if (err) {
            return res.status(500).json({ message: 'Error while authenticating' });
        }
        if (!user) {
            return res.status(400).json({ message: 'Wrong credentials' });
        }
        req.login(user, err => {
            if (err) {
                return res.status(500).json({ message: 'Error while attempting to login' })
            }
            return res.status(200).json(user);
        })
    })(req, res, next)
});

router.delete('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'Successful logout' });
})

router.get('/loggedin', (req, res) => {
    res.json(req.user);
})

module.exports = router;