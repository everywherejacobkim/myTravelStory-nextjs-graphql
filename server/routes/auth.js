import express from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import { createRequire } from "module";

const router = express.Router();
const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

const require = createRequire(import.meta.url);
const users = require("../data.json");

const authRouter = () => {

    // Sign up
    router.post('/signup',
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
            let user = users?.find(user => user.email === email);

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }
            
            // hash password
            // const salt = await bcrypt.genSalt(10);
            // console.log('salt: ', salt);

            // const hashedPassword = await bcrypt.hash(password, salt);
            // console.log('hashed password: ', hashedPassword)

            // save user to database
            users?.push({ email, password });

            // JWT
            const accessToken = await JWT.sign({ email }, JWT_SECRET, { expiresIn: '1200s' });
            res.json({ accessToken });
        }
    )
    

    // Log in
    router.post("/login", async (req, res) => {
        const { email, password } = req.body;

        // validate if user exists
        const user = users.find(user => user.email === email);

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }

        // validate password
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }

        // JWT
        const accessToken = await JWT.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1200s' });
        res.json({ accessToken });
    }
    );


    // Get all users
    router.get('/users', (req, res) => {
        res.json(users);
    }
    );

}

export default authRouter;