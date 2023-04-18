// THIS IS SIMPLY A TEMPLATE FOR HOW WE ARE BUILDING BACKEND APIS

const Todo = require("../models/todo");

exports.createTodo = (req, res, next) => {
    console.log("here");
    console.log(req.body.title);
    console.log(req.body.content);
    console.log(req.body.date);
    const todo = new Todo({
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
    });
    console.log(todo);
    // console.log(req);
    todo
        .save()
        .then((result) => {
            res.status(201).json({
                message: "Todo added successfully",
                post: {
                    ...result.toObject(),
                    id: result._id,
                },
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Fail to create todo!",
            });
        });
};

// const Todo = require("../models/todo");

exports.getTodos = (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currPage = +req.query.page;
    const todoQuery = Todo.find();
    let fetchedToDo;
    if (pageSize && currPage) {
      todoQuery.skip(pageSize * (currPage - 1)).limit(pageSize);
    }
    todoQuery
      .populate() // populate all fields
      .then((docs) => {
        fetchedToDo = docs;
        console.log(fetchedToDo);
        return Todo.countDocuments();
      })
      .then((count) => {
        res.status(200).json({
          message: "All Todos fetched 200!",
          posts: fetchedToDo,
          maxPosts: count,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Fetching todos failed!",
        });
      });
  };  
  

// const Todo = require("../models/todo");

exports.getTodoById = (req,res, next) => {
    Todo.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "Todo not found!" });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Fetching todo failed!",
            });
        });
};

// const Todo = require("../models/todo");

exports.updateTodo = (req, res, next) => {
    const updatedTodo = {
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
    };
    Todo.updateOne({ _id: req.params.id }, { $set: updatedTodo })
        .then((result) => {
            res.status(200).json({ message: "Update is successful!" });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Couldn't update todo!",
            });
        });
};

// const Todo = require("../models/todo");

exports.deleteTodo = (req, res, next) => {
    console.log("here");
    console.log(req.params.id);
    Todo.deleteOne({ _id: req.params.id })
    .then((resp) => {
        res.status(200).json({ message: "Delete is successful!" });
    })
    .catch((error) => {
        res.status(500).json({
            message: "Couldn't delete todo!",
        });
    });
};