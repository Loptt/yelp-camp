var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://cdn2.howtostartanllc.com/images/business-ideas/business-idea-images/Campground.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero nunc consequat interdum varius sit. Viverra orci sagittis eu volutpat odio facilisis mauris sit amet. Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Elementum tempus egestas sed sed risus pretium. Libero volutpat sed cras ornare arcu dui vivamus arcu felis. Velit ut tortor pretium viverra suspendisse potenti nullam. Mauris in aliquam sem fringilla ut morbi tincidunt augue. Sem nulla pharetra diam sit amet nisl suscipit. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Ornare massa eget egestas purus. Leo vel orci porta non pulvinar."
    },
    {
        name: "Desert Mesa",
        image: "https://d2ciprw05cjhos.cloudfront.net/files/v3/styles/gs_large/public/images/18/06/gettyimages-649155058.jpg?itok=Lhx5ciAR",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero nunc consequat interdum varius sit. Viverra orci sagittis eu volutpat odio facilisis mauris sit amet. Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Elementum tempus egestas sed sed risus pretium. Libero volutpat sed cras ornare arcu dui vivamus arcu felis. Velit ut tortor pretium viverra suspendisse potenti nullam. Mauris in aliquam sem fringilla ut morbi tincidunt augue. Sem nulla pharetra diam sit amet nisl suscipit. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Ornare massa eget egestas purus. Leo vel orci porta non pulvinar."
    },
    {
        name: "Canyon Floor",
        image: "https://cdn.vox-cdn.com/thumbor/-JoPdcgAuLTUsWiDZ62CX4wb33k=/0x0:5225x3479/1200x800/filters:focal(2195x1322:3031x2158)/cdn.vox-cdn.com/uploads/chorus_image/image/54137643/camping_tents.0.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero nunc consequat interdum varius sit. Viverra orci sagittis eu volutpat odio facilisis mauris sit amet. Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Elementum tempus egestas sed sed risus pretium. Libero volutpat sed cras ornare arcu dui vivamus arcu felis. Velit ut tortor pretium viverra suspendisse potenti nullam. Mauris in aliquam sem fringilla ut morbi tincidunt augue. Sem nulla pharetra diam sit amet nisl suscipit. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Ornare massa eget egestas purus. Leo vel orci porta non pulvinar."
    }
]

function seedDB() {
    Campground.remove({}, (err) => {
        if(err) {
            console.log(err);
        }
        console.log("Removed campgrounds!");

        Comment.remove({}, (err) => {
            if (err) {
                console.log(err);
            }
            console.log("Removed comments!");
            
            data.forEach((seed) => {
                Campground.create(seed, (err, campground) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Added a campground");
                        Comment.create({
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, (err, comment) => {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                    }
                });
            });
        });
    }); 
}

module.exports = seedDB;