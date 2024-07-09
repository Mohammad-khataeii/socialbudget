const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('./auth');
const { sequelize } = require('./models');
const { ensureAuthenticated } = require('./middleware/auth');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Ensure secure is false for development
}));
app.use(passport.initialize());
app.use(passport.session());

// Authentication routes
app.post('/api/login', passport.authenticate('local'), (req, res) => {
    console.log('User logged in:', req.user); // Debugging log
    res.send(req.user);
});

app.post('/api/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
});

// Budget route
app.post('/api/budget', ensureAuthenticated, async (req, res) => {
    console.log('Setting budget by user:', req.user); // Debugging log
    const { amount } = req.body;
    const budget = await Budget.create({ amount });
    res.send(budget);
});

// Proposal routes
const proposalRoutes = require('./routes/proposals');
app.use('/api', ensureAuthenticated, proposalRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await sequelize.sync({ force: false });
    console.log('Database connected!');
});
