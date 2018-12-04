var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

var campgrounds = [
    {name: "Salmon Creek", image: "https://s3.amazonaws.com/imagescloud/images/medias/reservation/camping/main.jpg"},
    {name: "Granite Hills", image: "https://d2ciprw05cjhos.cloudfront.net/files/v3/styles/gs_large/public/images/18/06/gettyimages-649155058.jpg?itok=Lhx5ciAR"},
    {name: "Mountain Goat's Rest", image: "https://www.revistaoxigeno.es/media/cache/big/upload/images/article/16162/article-el-camping-es-para-el-invierno-5864f7d9f2e57.jpg"}

];

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {
        name: name,
        image: image
    };
    
    campgrounds.push(newCampground);

    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.listen(3000, () => {
    console.log("YelpCamp server has started!");
})