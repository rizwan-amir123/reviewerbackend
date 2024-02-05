const User = require("../model/users");

const getUser = (req, res) => {
    const email = req.query.email;
    User
        .find({email: email})
        .then(data => res.json(data))
        .catch (err => {
            res.status(500).send({
                message:err.message || "An error occured"
            });
        });
};

module.exports = {
    getUser
};