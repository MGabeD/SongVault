const Song = require("../models/songs");

exports.createSong = (req, res, next) => {
    const song = new Song({
        title: req.body.title,
        artist: req.body.artists
    });
    console.log(song);
    // console.log(req);
    song
        .save()
        .then((result) => {
            res.status(201).json({
                message: "Song added successfully",
                post: {
                    ...result.toObject(),
                    id: result._id,
                },
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Fail to create Song!",
            });
        });
};

exports.getSong = (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currPage = +req.query.page;
    const songQuery = User.find();
    let fetchedSong;
    if (pageSize && currPage) {
      songQuery.skip(pageSize * (currPage - 1)).limit(pageSize);
    }
    songQuery
      .populate() // populate all fields
      .then((docs) => {
        fetchedUser = docs;
        console.log(fetchedUser);
        return Song.countDocuments();
      })
      .then((count) => {
        res.status(200).json({
          message: "All song fetched 200!",
          posts: fetchedSong,
          maxPosts: count,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Fetching Songs failed!",
        });
      });
  };  
  

exports.getUserById = (req,res, next) => {
    Song.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "User not found!" });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Fetching user failed!",
            });
        });
};

exports.updateSong = (req, res, next) => {
    const updatedSong = {
        title: req.body.title,
        artist: req.body.artists
    };
    console.log(updatedSong);
    Song.updateOne({ _id: req.params.id }, { $set: updatedSong })
        .then((result) => {
            res.status(200).json({ message: "Update is successful!" });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Couldn't update song!",
            });
            console.log(error);
        });
};

exports.deleteSong = (req, res, next) => {
    console.log("here");
    console.log(req.params.id);
    Song.deleteOne({ _id: req.params.id })
    .then((resp) => {
        res.status(200).json({ message: "Delete is successful!" });
    })
    .catch((error) => {
        res.status(500).json({
            message: "Couldn't delete song!",
        });
    });
};