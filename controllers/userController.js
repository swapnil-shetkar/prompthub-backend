const User = require("../models/user");

exports.userById = (req, res, next, id) => {
    User.findById(id)
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            req.profile = user;
            next();
        })
        .catch(err => {
            return res.status(400).json({
                error: "User not found"
            });
        });
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    return res.json(req.profile);
};

exports.update = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.profile._id },
            { $set: req.body },
            { new: true }
        );

        if (!user) {
            return res.status(400).json({
                error: "You are not authorized to perform this action"
            });
        }

        // Clear the hashed password before sending the response
        user.hashed_password = undefined;
        res.json(user);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

