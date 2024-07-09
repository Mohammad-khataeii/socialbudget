const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./models');
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        console.log(`Trying to authenticate user: ${username}`);
        const user = await User.findOne({ where: { username } });
        if (!user) {
            console.log('User not found.');
            return done(null, false, { message: 'Incorrect username.' });
        }
        console.log('User found:', user);
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            console.log('Password mismatch.');
            return done(null, false, { message: 'Incorrect password.' });
        }
        console.log('Authentication successful.');
        return done(null, user);
    } catch (err) {
        console.error('Authentication error:', err);
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
