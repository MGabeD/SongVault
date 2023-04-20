const Request = require("../models/request");

exports.createRequest = (req, res, next) => {
    const request = new request({
        sender: req.body.sender,
        receiver: req.body.receiver,
    });
    // console.log(request);
    // console.log(req);
    request
        .save()
        .then((result) => {
            res.status(201).header('Content-Type', 'application/json').json({
                message: "request added successfully",
                post: {
                    ...result.toObject(),
                    id: result._id,
                },
            });
        })
        .catch((err) => {
            res.status(500).header('Content-Type', 'application/json').json({
                message: "Fail to create request!",
            });
        });
};

exports.getRequest = (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currPage = +req.query.page;
    const requestQuery = Request.find();
    let fetchedRequest;
    if (pageSize && currPage) {
      requestQuery.skip(pageSize * (currPage - 1)).limit(pageSize);
    }
    requestQuery
      .populate() // populate all fields
      .then((docs) => {
        fetchedRequest = docs;
        console.log(fetchedRequest);
        return Request.countDocuments();
      })
      .then((count) => {
        res.status(200).header('Content-Type', 'application/json').json({
          message: "All requests fetched 200!",
          posts: fetchedRequest,
          maxPosts: count,
        });
      })
      .catch((error) => {
        res.status(500).header('Content-Type', 'application/json').json({
          message: "Fetching requests failed!",
        });
      });
  };  
  

exports.getRequestById = (req,res, next) => {
    Request.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).header('Content-Type', 'application/json').json(post)
            } else {
                res.status(404).header('Content-Type', 'application/json').json({ message: "Request not found!" });
            }
        })
        .catch((error) => {
            res.status(500).header('Content-Type', 'application/json').json({
                message: "Fetching Request failed!",
            });
        });
};

exports.updateRequest = (req, res, next) => {
    const updatedRequest = {
        sender: req.body.sender,
        receiver: req.body.receiver,
    };
    console.log(updatedRequest);
    Request.updateOne({ _id: req.params.id }, { $set: updatedRequest })
        .then((result) => {
            res.status(200).header('Content-Type', 'application/json').json({ message: "Update is successful!" });
        })
        .catch((error) => {
            res.status(500).header('Content-Type', 'application/json').json({
                message: "Couldn't update request!",
            });
            console.log(error);
        });
};

exports.deleteRequest = (req, res, next) => {
    // console.log("here");
    // console.log(req.params.id);
    Reque.deleteOne({ _id: req.params.id })
    .then((resp) => {
        res.status(200).header('Content-Type', 'application/json').json({ message: "Delete is successful!" });
    })
    .catch((error) => {
        res.status(500).header('Content-Type', 'application/json').json({
            message: "Couldn't delete request!",
        });
    });
};