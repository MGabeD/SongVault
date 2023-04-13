const User = require("../models/user");
const Song = require("../models/song");

exports.addLike = (req, res, next) => {
    const userId = req.params.id;
    const songId = req.body.songId;

    User.findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if the songId is already in the user's likedSongs array
            const songAlreadyLiked = user.likedSongs.includes(songId);

            if (!songAlreadyLiked) {
                // If the song isn't already in the array, add it and save the user object
                User.updateOne({ _id: userId }, { $push: { likedSongs: songId } })
                    .then(() => {
                        Song.updateOne({ _id: songId }, { $inc: { likes: 1 } })
                            .then(() => {
                                res.status(200).json({
                                    message: "Successfully liked song",
                                    songId: songId
                                });
                            })
                            .catch((error) => {
                                res.status(500).json({
                                    message: "Failed to increment song likes",
                                    error: error
                                });
                            });
                    })
                    .catch((error) => {
                        res.status(500).json({
                            message: "Failed to update user",
                            error: error
                        });
                    });
            } else {
                // If the song is already in the array, return the user object without modifying it
                return res.status(200).json({ message: 'Song already in likedSongs array', user: user });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Failed to find user",
                error: error
            });
        });
};

exports.deleteLike = async (req, res, next) => {
    const userId = req.params.id;
    const songId = req.body.songId;
  
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { likedSongs: songId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const song = await Song.findByIdAndUpdate(
        songId,
        { $inc: { likes: -1 } },
        { new: true }
      );
      if (!song) {
        return res.status(404).json({ message: "Song not found" });
      }
  
      return res.status(200).json({
        message: "Successfully removed like",
        user: user,
        song: song,
      });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  };
  