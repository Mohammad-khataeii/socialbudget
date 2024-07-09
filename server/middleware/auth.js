const ensureAuthenticated = (req, res, next) => {
    console.log('User session:', req.user); // Debugging log
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send('Unauthorized');
};

module.exports = { ensureAuthenticated };
