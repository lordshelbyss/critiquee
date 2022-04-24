const passport = require("passport");
require("../services/passport");

// making the express application being accesible to this is by calling it from the index.js file
// where it is declared
module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  // test route for session being stored on the request 
  app.get('/api/user',(req,res)=>{
    res.send(req.session);
  })
};
