const jwt = require("jsonwebtoken");

function authmiddleware(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            req.body.userid = decoded.userid;
            req.body.username = decoded.username;
            req.body.userrole = decoded.userrole
            next();

        });
    }
    else {
        res.status(400).json({ message: "token not found" });
    }
}

module.exports = authmiddleware;