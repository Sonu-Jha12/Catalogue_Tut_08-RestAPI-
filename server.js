
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

app.use(express.json());
app.use(express.static('public'));

const SECRET = 'dev-secret-change-me';

// Users
const users = [
    {
        id: 1,
        email: 'asha@campus.edu',
        role: 'customer',
        hash: bcrypt.hashSync('customer123', 10)
    },
    {
        id: 2,
        email: 'mealhub@campus.edu',
        role: 'restaurant',
        hash: bcrypt.hashSync('resto123', 10)
    }
];

// Menu items
let items = [
    { id: 1, name: 'Veg Thali', price: 90 },
    { id: 2, name: 'Paneer Roll', price: 70 }
];

let nextId = 3;

function auth(req, res, next) {
    const authHeader = req.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            error: 'missing authorization token'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        req.user = jwt.verify(token, SECRET);
        next();
    } catch (error) {
        return res.status(401).json({
            error: 'invalid or expired token'
        });
    }
}

function requireRole(...allowed) {
    return (req, res, next) => {
        if (!allowed.includes(req.user.role)) {
            return res.status(403).json({
                error: 'forbidden'
            });
        }

        next();
    };
}

app.post('/login', (req, res) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json({
            error: 'email and password required'
        });
    }

    const user = users.find(u => u.email === email);

    if (!user || !bcrypt.compareSync(password, user.hash)) {
        return res.status(401).json({
            error: 'bad login'
        });
    }

    const token = jwt.sign(
        {
            sub: user.id,
            role: user.role
        },
        SECRET,
        {
            expiresIn: '1h'
        }
    );

    res.json({
        message: 'login successful',
        token: token
    });
});

app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/items/:id', (req, res) => {
    const item = items.find(
        i => i.id === Number(req.params.id)
    );

    if (!item) {
        return res.status(404).json({
            error: 'item not found'
        });
    }

    res.json(item);
});

app.post(
    '/items',
    auth,
    requireRole('restaurant', 'admin'),
    (req, res) => {
        const { name, price } = req.body || {};

        if (!name || typeof name !== 'string' || !name.trim()) {
            return res.status(422).json({
                error: 'valid item name required'
            });
        }

        const numericPrice = Number(price);

        if (!Number.isFinite(numericPrice) || numericPrice < 0) {
            return res.status(422).json({
                error: 'valid price required'
            });
        }

        const item = {
            id: nextId++,
            name: name.trim(),
            price: numericPrice
        };

        items.push(item);

        res.status(201).json({
            message: 'item added successfully',
            item: item
        });
    }
);

app.listen(3000, () => {
    console.log('Catalogue running at http://localhost:3000');
});
