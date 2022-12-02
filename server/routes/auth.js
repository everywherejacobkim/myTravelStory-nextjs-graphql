const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const users = require('../database');

require('dotenv').config();

// Sign up
router.post(
    '/signup',
    [
        check('email', 'Invalid email').isEmail(),      
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    async (req, res) => {
        const { email, password } = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // validate if user already exists
        let user = users.find(user => user.email === email);

        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }
        
        // hash password
        const salt = await bcrypt.genSalt(10);
        console.log('salt: ', salt);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('hashed password: ', hashedPassword)

        // save user to database
        users.push({ email, password: hashedPassword });

        // JWT
        const accessToken = await JWT.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1200s' });
        res.json({ accessToken });

    }
)

module.exports = router;