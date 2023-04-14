// const User = require("../models/user");
const Song = require("../models/song");

exports.getTrending = function(req, res, next) {
  Song.find()
    .sort({ likes: -1, plays: -1 })
    .limit(20)
    .then(function(topTrendingSongs) {
      res.status(200).json({ songs: topTrendingSongs });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.message });
    });
};

