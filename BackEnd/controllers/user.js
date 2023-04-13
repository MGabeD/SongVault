const User = require("../models/user");

exports.createUser = (req, res, next) => {
    console.log('got createUser req');
    const user = new User({
        userName: req.body.userName,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        stageName: req.body.stageName,
        birthday: req.body.birthday,
        bio: req.body.bio,
        hyperLinks: req.body.hyperLinks,
        followers: req.body.followers,
        friends: req.body.friends,
        songs: req.body.songs,
        playlists: req.body.playlists,
    });
    console.log(user);
    User.findOne({
        $or: [
            { userName: user.userName },
            { email: user.email }
        ]
    })
    .then(foundUser => {
        if (!foundUser) {
            return user.save();
        } else {
            throw new Error("User already exists.");
        }
    })
    .then((result) => {
        res.status(201).json({
            message: "User added successfully",
            post: {
                ...result.toObject(),
                id: result._id,
            },
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            message: err.message || "Fail to create user!",
        });
    });
};


// exports.createUser = (req, res, next) => {
//     console.log('got createUser req')
//     const user = new User({
//         userName: req.body.userName,
//         password: req.body.password,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         stageName: req.body.stageName,
//         birthday: req.body.birthday,
//         bio: req.body.bio,
//         hyperLinks: req.body.hyperLinks,
//         followers: req.body.followers,
//         friends: req.body.friends,
//         songs: req.body.songs,
//         playlists: req.body.playlists,
//     });
//     console.log(user);
    
//     user
//         .save()
//         .then((result) => {
//             res.status(201).json({
//                 message: "User added successfully",
//                 post: {
//                     ...result.toObject(),
//                     id: result._id,
//                 },
//             });
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 message: "Fail to create user!",
//             });
//         });
// };

exports.getUser = (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currPage = +req.query.page;
    const userQuery = User.find();
    let fetchedUser;
    if (pageSize && currPage) {
      userQuery.skip(pageSize * (currPage - 1)).limit(pageSize);
    }
    userQuery
      .populate() // populate all fields
      .then((docs) => {
        fetchedUser = docs;
        console.log(fetchedUser);
        return User.countDocuments();
      })
      .then((count) => {
        res.status(200).json({
          message: "All users fetched 200!",
          posts: fetchedUser,
          maxPosts: count,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Fetching users failed!",
        });
      });
  };  
  

exports.getUserById = (req,res, next) => {
    User.findById(req.params.id)
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

exports.updateUser = (req, res, next) => {
    const updatedUser = {
        userName: req.body.userName,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        stageName: req.body.stageName,
        birthday: req.body.birthday,
        bio: req.body.bio,
        hyperLinks: req.body.hyperLinks,
        followers: req.body.followers,
        friends: req.body.friends,
        songs: req.body.songs,
        playlists: req.body.playlists,
    };
    console.log(updatedUser);
    User.updateOne({ _id: req.params.id }, { $set: updatedUser })
        .then((result) => {
            res.status(200).json({ message: "Update is successful!" });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Couldn't update user!",
            });
            console.log(error);
        });
};

exports.deleteUser = (req, res, next) => {
    console.log("here");
    console.log(req.params.id);
    User.deleteOne({ _id: req.params.id })
    .then((resp) => {
        res.status(200).json({ message: "Delete is successful!" });
    })
    .catch((error) => {
        res.status(500).json({
            message: "Couldn't delete user!",
        });
    });
};