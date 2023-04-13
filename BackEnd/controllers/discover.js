const User = require("../models/user");
const Song = require("../models/song");

// exports.getDisc = (req, res, next) => {
//     const userName = req.query.userName;
//     console.log(userName);
//     User.findOne(
//       {
//         $or: [{ userName: userName }, { email: userName }],
//       },
//       { _id: 1, songs: 1 }
//     )
//       .then((user) => {
//         if (!user) {
//           return res.status(404).json({
//             message: "User not found.",
//           });
//         }
  
//         res.status(200).json({
//           message: "User found.",
//           userId: user._id,
//           songs: user.songs,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json({
//           message: "An error occurred while finding user.",
//         });
//       });
//   };

  exports.getDisc = (req, res, next) => {
    const userName = req.query.userName;
    console.log(userName);

    // Find songs with matching titles
    Song.find({ name: userName }, { _id: 1 })
      .then((songs) => {
        // const songIds = songs.map((song) => song._id);
        const songIds = songs.map(song => song._id);
        console.log(songIds);
        // Find user and their songs
        User.findOne(
          { $or: [{ userName: userName }, { email: userName }] },
          { _id: 1, songs: 1 }
        )
          .then((user) => {
            // Find matching songs between the user and the searched songs
            // const matchingSongs = user.songs.filter((song) =>
            //   songIds.includes(song)
            // );
            // console.log(matchingSongs)
            if (!user) {
              return res.status(200).json({
                userId: "",
                songs: [],
                matchingSongs: songIds,
              });
            }
  
            
  
            res.status(200).json({
              userId: user._id,
              songs: user.songs,
              matchingSongs: songIds,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              message: "An error occurred while finding user.",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "An error occurred while finding songs.",
        });
      });
  };

  