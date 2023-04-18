const User = require("../models/user");

exports.getAuth = (req, res, next) => {
    const userName = req.query.userName;
    const password = req.query.password;
    console.log(userName);
    console.log(password);
    User.findOne({
        $and: [
        { $or: [{ userName: userName }, { email: userName }] },
        { password: password },
        ],
    }, { _id: 1 })
    .then(user => {
        if (!user) {
            return res.status(404).header('Content-Type', 'application/json').json({
            message: "User not found.",
            });
        }

        res.status(200).header('Content-Type', 'application/json').json({
            message: "User found.",
            userId: user._id,
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).header('Content-Type', 'application/json').json({
            message: "An error occurred while finding user.",
        });
    });
};
