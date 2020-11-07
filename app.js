const express = require("express");
const bodyParser = require("body-parser");
const { response } = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin18101189@cluster0.fhzsl.mongodb.net/raspDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new mongoose.Schema({
    postTitle: String,
    postText: String
});
const Post = mongoose.model("Post", postSchema);


app.get("/", function (req, res) {
    Post.find({}, function (err, element) {
        if (err) console.log(err);
        else res.render("index", { post: element });
    });


});

app.get("/:subUrl", function (req, res) {
    let subUrl = req.params.subUrl;

    Post.findOne({ _id: subUrl }, function (err, element) {
        if (err) console.log("error");
        else res.render("posts", { postTitle: element.postTitle, postText: element.postText });
    });
});


app.get("/admin/compose", function (req, res) {
    res.render("compose");
});

app.post("/admin/compose", function (req, res) {
    const temp = new Post();
    temp.postTitle = req.body.postTitle;
    temp.postText = req.body.postText;
    temp.save();
    res.redirect("/");
});


app.listen(3000, function () {
    console.log("Server started on port 3000");
})