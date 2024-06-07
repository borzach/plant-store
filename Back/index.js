const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3001;
const jsonDataPath = "./plants.json";
const imagesPath = './public/images';
const usersFilePath = './users.json';
const cartsFilePath = './carts.json';
let jsonData = [];

app.use(express.json());

fs.readFile(jsonDataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the JSON file:', err);
      return;
    }
    try {
      jsonData = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing the JSON file:', parseErr);
    }
});

function generateSecureId() {
    return crypto.randomBytes(16).toString('hex');
}

app.options('*', cors())
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

app.use('/images', express.static(imagesPath));

app.get('/plants', (req, res) => {
    res.json(jsonData);
});

app.get('/', (req, res) => {
    res.send('Backend for Messaging App');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const users = JSON.parse(fs.readFileSync(usersFilePath));
    const user = users.find(user => user.email === email);
    if (user) {
        if (user.password === password) {
            if (req.session) {
                req.session.userId = user.id;
            }
            res.json(user);
        } else {
            res.status(404).send('Mot de passe incorrect');
        }
    } else {
      res.status(404).send('Utilisateur non trouvé');
    }
});
  

app.post('/users', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const users = JSON.parse(fs.readFileSync(usersFilePath));

    const user = users.find(user => user.email === email);
    if (user) {
        res.status(404).send('User already exist');
    } else {
        const id = generateSecureId();
        const user = { id, email, password };
        if (req.session) {
            req.session.userId = id;
        }
        users.push(user);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        res.json(user);
    }
});

app.get('/carts/:id', (req, res) => {
    const userId = req.params.id;
    const carts = JSON.parse(fs.readFileSync(cartsFilePath));
    const cart = carts.find(cart => cart.ownerId === userId);
    if (cart) {
      res.json(cart);
    } else {
      res.json([]);
    }
});

app.post('/carts', async (req, res) => {
    const newCart = req.body;
    const carts = JSON.parse(fs.readFileSync(cartsFilePath));

    const cart = carts.find(cart => cart.id === newCart.id);
    if (cart) {
        res.status(404).send('Cart already exist');
    } else {
        newCart.id = generateSecureId();
        carts.push(newCart);
        fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
        res.json(newCart);
    }
});

app.put('/carts/:id', (req, res) => {
    const cartId = req.params.id;
    const updatedCartData = req.body;
    let carts = JSON.parse(fs.readFileSync(cartsFilePath));

    let cart = carts.find(cart => cart.id === cartId);
  
    if (!cart) {
      return res.status(404).json({ message: 'Panier non trouvé' });
    }
  
    // Mettre à jour les propriétés du panier
    cart = { ...cart, ...updatedCartData };
  
    // Mettre à jour le panier dans la liste
    carts = carts.map(c => (c.id === cartId ? cart : c));
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
    res.json(cart);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});