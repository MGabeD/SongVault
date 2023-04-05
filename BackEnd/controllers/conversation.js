const conversation = require("../models/conversation");
const Conversation = require("../models/conversation");

exports.createRequest = (req, res, next) => {
    const conversation = new conversation({
        users : req.body.sender,
        title : req.body.receiver,
    });
    // console.log(request);
    // console.log(req);
    conversation
        .save()
        .then((result) => {
            res.status(201).json({
                message: "conversation added successfully",
                post: {
                    ...result.toObject(),
                    id: result._id,
                },
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Fail to create conservation!",
            });
        });
};

exports.getRequest = (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currPage = +req.query.page;
    const conversationQuery = Conversation.find();
    let fetchedConversation;
    if (pageSize && currPage) {
        conversationQuery.skip(pageSize * (currPage - 1)).limit(pageSize);
    }
    conversationQuery
      .populate() // populate all fields
      .then((docs) => {
        fetchedConversation = docs;
        console.log(fetchedConversation);
        return Conversation.countDocuments();
      })
      .then((count) => {
        res.status(200).json({
          message: "All requests fetched 200!",
          posts: fetchedRequest,
          maxPosts: count,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Fetching requests failed!",
        });
      });
  };  
  

exports.getRequestById = (req,res, next) => {
    Request.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "Request not found!" });
            }
        })
        .catch((error) => {
            res.status(500).json({
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
            res.status(200).json({ message: "Update is successful!" });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Couldn't update request!",
            });
            console.log(error);
        });
};

exports.deleteRequest = (req, res, next) => {
    // console.log("here");
    console.log(req.params.id);
    Reque.deleteOne({ _id: req.params.id })
    .then((resp) => {
        res.status(200).json({ message: "Delete is successful!" });
    })
    .catch((error) => {
        res.status(500).json({
            message: "Couldn't delete request!",
        });
    });
};