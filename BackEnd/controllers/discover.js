const User = require("../models/user");

exports.getDisc = (req, res, next) => {
    const userName = req.query.userName;
    console.log(userName);
    User.findOne(
      {
        $or: [{ userName: userName }, { email: userName }],
      },
      { _id: 1, songs: 1 }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: "User not found.",
          });
        }
  
        res.status(200).json({
          message: "User found.",
          userId: user._id,
          songs: user.songs,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "An error occurred while finding user.",
        });
      });
  };
  
