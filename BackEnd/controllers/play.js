const User = require("../models/user");

exports.playSong = (req, res, next) => {
    const id = req.params.id;
    Song.updateOne({ _id: songId }, { $inc: { plays: 1 } })
        .then(() => {
            res.status(200).header('Content-Type', 'application/json').json({
                message: "Successfully played song",
                songId: songId
            });
        })
        .catch((error) => {
            res.status(500).header('Content-Type', 'application/json').json({
                message: "Failed to increment song plays",
                error: error
            });
        });
};
