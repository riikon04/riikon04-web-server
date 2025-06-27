import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/discord', passport.authenticate('discord'));

router.get('/discord/callback', 
  passport.authenticate('discord', {
    failureRedirect: '/admin-panel/login.html'
  }),
  (req, res) => {
    res.redirect('/admin-panel');
  }
);

router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/login-failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Authentication failed'
  });
});

router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: {
        id: req.user.discordId,
        username: req.user.username,
        avatar: req.user.avatar,
        isAdmin: req.user.isAdmin,
        isGuildMember: req.user.isGuildMember
      }
    });
  } else {
    res.json({
      authenticated: false
    });
  }
});

export default router;