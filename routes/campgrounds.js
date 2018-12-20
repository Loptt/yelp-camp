var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/", (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        }
        res.render("campgrounds/index", { campgrounds: allCampgrounds });
    })
});

router.post("/", middleware.isLoggedIn, (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;

    var author = {
        id: req.user._id,
        username: req.user.username
    };

    var newCampground = {
        name: name,
        image: image,
        description: desc,
        author: author
    };

    Campground.create(newCampground, (err, newCamp) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCamp) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCamp });
        }
    });
});

router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            req.flash("error", "Campground not found!");
            res.redirect("back");
        }
        res.render("campgrounds/edit", { campground: campground });
    });
});

router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Successfully updated campground");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            flash("Campground deleted");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;