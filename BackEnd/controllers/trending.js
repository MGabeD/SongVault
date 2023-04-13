// const User = require("../models/user");
const Song = require("../models/song");

exports.getTrending = function(req, res, next) {
  Song.find()
    .sort({ likes: -1 })
    .limit(20)
    .then(function(topLikedSongs) {
      res.status(200).json({ songs: topLikedSongs });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.message });
    });
};
