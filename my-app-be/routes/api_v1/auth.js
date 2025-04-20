var express = require('express'); // ESM: import
var { login } = require('../../models/users.js');
var { comparePassword } = require('../../utils/authHelpers.js');
const { config } = require('../../config/config.js');
var router = express.Router();

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log("sme v route")
    login(username)
        .then((result) => {            
            if (result.rows && result.rows.length === 1) {                
                const userId = result.rows[0].user_id;
                const hashedPassword = result.rows[0].user_password;
                console.log("userId", userId)
                console.log("hashedpswd", hashedPassword)
                comparePassword(password, hashedPassword)
                    .then((isValid) => {
                        if (isValid) {
                            req.session.userId = userId;  // creates session
                            return res.status(200).end();
                        }
                        // invalid password
                        else {
                            console.log("Invalid password");
                            return res.status(401).end();
                        }
                    })
                    .catch((e) => { 
                        console.log(e); 
                        // internal server error
                        res.status(500).end(); 
                    })
            }
            // user does not exist
            else {
                console.log("User does not exist");
                return res.status(401).end();
            }
        })
        .catch((e) => {
            console.log(e);
            return res.status(500).end();
        })
});

router.delete("/logout", (req, res) => {    
    if (req.session && req.session.userId) {        
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                return res.status(500).end();  // internal server error
            } else {
                // clear the cookie in the browser
                res.clearCookie(config.session.cookieName);
                return res.status(200).end();  // successful logout
            }
        });
    } else {
        return res.status(400).end();  // bad request - session doesn't exist
    }
});

router.get("/check", (req, res) => {
    if (req.session && req.session.userId) {
      res.status(200).json({ loggedIn: true });
    } else {
      res.status(200).json({ loggedIn: false });
    }
});

router.get("/me", (req, res) => {
    if (req.session && req.session.userId) {
        return res.status(200).json({
            userId: req.session.userId,
            username: req.session.username,
            isAdmin: req.session.isAdmin
        });
    } else {
        return res.status(401).json({ message: "Not logged in" });
    }
});
  

module.exports = router;