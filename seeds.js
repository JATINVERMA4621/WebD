var mongoose=require("mongoose");
var Image=require("./models/image");
var Comment=require("./models/comments");

var data=[ {
    name:"Lake Baikal",
    img: "https://sacredland.org/wp-content/uploads/2017/07/Lake-Baikal.jpg",
    description:"Lake Baikal is in a rift valley, created by the Baikal Rift Zone, where the Earth's crust is slowly pulling apart.[18] At 636 km (395 mi) long and 79 km (49 mi) wide, Lake Baikal has the largest surface area of any freshwater lake in Asia, at 31,722 km2 (12,248 sq mi), and is the deepest lake in the world at 1,642 m (5,387 ft). The bottom of the lake is 1,186.5 m (3,893 ft) below sea level, but below this lies some 7 km (4.3 mi) of sediment, placing the rift floor some 8–11 km (5.0–6.8 mi) below the surface, the deepest continental rift on Earth.[18] In geological terms, the rift is young and active – it widens about 2 cm (0.8 in) per year."
         },
    {name:"Squam Lake",
    img:"https://odis.homeaway.com/odis/destination/2d62f656-a052-4d93-b06c-156034b02304.hw1.jpg",
    description:"Squam Lake is a lake located in the Lakes Region of central New Hampshire, United States, south of the White Mountains, straddling the borders of Grafton, Carroll, and Belknap counties. The largest town center on the lake is Holderness. The lake is located northwest of much larger Lake Winnipesaukee.It drains via a short natural channel into Little Squam Lake, and then through a dam at the head of the short Squam River into the Pemigewasset at Ashland. Covering 6,791 acres (27.48 km2),[1] Squam is the second-largest lake located entirely in New Hampshire."
    
    },
    { name:"Detroit Lake",
      img:"https://media.gannett-cdn.com/salem/41801895001/201706/3229/41801895001_5458268570001_5458240147001-vs.jpg",
      description:"Detroit Lake is situated over a historical road bed of the former Oregon Pacific Railroad. This route was built by Colonel T. Egenton Hogg as a proposed transcontinental railroad. Because of a lack of funding, the line terminated in Idanha, southeast of the lake. Idanha had rail service until the 1950s, when the track was removed for installation of the Detroit and Big Cliff reservoirs.[3] Detroit Lake was created in 1953 after the completion of the dam.[1] Part of the Willamette Valley Projects, the lake was intended primarily for flood control and power generation but has become one of the major recreation resources in western Oregon."
      },
     { name:"Balsam Lake",
    img:"https://odis.homeaway.com/odis/destination/ff43a6a1-0078-4507-9532-15badbe58320.hw1.jpg",
     description:"It's a beautiful lake"}
];
function seedDB()
{
    data.forEach(function(d){
    Image.remove({},function(err){
         if(err){
        console.log(err);
    }
    Image.create(d,function(err,image){
        if(err){
            console.log(err);
        }else{
            console.log("image added");
            //CREATING A COMMENT
            Comment.create({text:"It is such a beautiful place to visit",
                            author:"jatin verma"
                        
                            },function(err,comment){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    image.comments.push(comment);
                                    image.save();
                                    console.log("created new comment");
                                }
                            
                        });
            }
        
    });
        
        
    });
   
});
}
module.exports=seedDB;