module.exports = function(app, passport) {

    // google ---------------------------------

    // send to google to do the authentication
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
	passport.authenticate('google', {
	    successRedirect : '/profile',
	    failureRedirect : '/'
	}));

    app.get('/unlink/google', isLoggedIn, function(req, res) {
	var user = req.user;
	user.google.token = undefined;
	user.save(function(err) {
	    res.redirect('/profile');
	});
    });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
	return next();

    res.redirect('/');
}
