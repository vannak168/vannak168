Sokha KHAN, [26/04/2023 0:39]
Good evening class, we still have one more day on Saturday this week. Please join our class altogether, and especially I hope you will show me some path of your assignment.

And this is the another homework for you by placing this script into your GitHub repository, then create the task in Jira with two ticket as following:
1) Login project with NodeJS
2) Refactoring Login Project with NodeJS

By switch your team on as creator and another person as refactor

Sokha KHAN, [26/04/2023 0:49]
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
 
const app = express();
const PORT = process.env.PORT || 3000;
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));
 
app.use(passport.initialize());
app.use(passport.session());
 
passport.use(new LocalStrategy(
    function (username, password, done) {
        // Replace this with your own user lookup function
        if (username === 'admin' && bcrypt.compareSync(password, bcrypt.hashSync('password', 10))) {
            return done(null, { id: 1, username: 'admin' });
        } else {
            return done(null, false, { message: 'Invalid username or password' });
        }
    }
));
 
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
 
passport.deserializeUser(function (id, done) {
    // Replace this with your own user lookup function
    done(null, { id: 1, username: 'admin' });
});
 
app.get('/', function (req, res) {
    res.send('Welcome Software Engineering Final Project');
});
 
app.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true })
);
 
app.get('/login', function (req, res) {
    res.send(`
        <h1>Login</h1>
        <form method="POST" action="/login">
            <div>
                <label>Username:</label>
                <input type="text" name="username" required>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" required>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    `);
});
 
app.listen(PORT, function () {
    console.log(Server listening on http://localhost:${PORT});
});
