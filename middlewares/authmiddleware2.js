function authmiddleware2(roles) {

    return (req, res, next) => {
        if (roles.includes(req.body.userrole)) {
            next();
        }
        else {
            res.status(400).json({message:"not allowed"});
        }
    }
}

module.exports = authmiddleware2