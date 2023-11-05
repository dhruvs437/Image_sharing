const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const POST = mongoose.model("POST");
const USER=mongoose.model("USER");
//Route

router.get("/allposts", requireLogin, (req, res) => {
  // console.log("here in all posts");
  POST.find()
    .populate("postedBy", "_id name Photo")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
});



router.post("/createPost", requireLogin, (req, res) => {
  const { body, pic } = req.body;
  // console.log(pic);
  if (!pic || !body) {
    return res.status(422).json({ error: "please add all the feild" });
  }
  //   req.user;
  // console.log(req.user);
  const post = new POST({
    body,
    photo: pic,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      return res.json({ post: result });
    })
    .catch((err) => console.log(err));
});

router.get("/myposts", requireLogin, (req, res) => {
  POST.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then((myposts) => {
      res.json(myposts);
    });
});

const generatergx = (str,arrayReg)=>{
  let curr="";
  let ascii;
  for(let i=0;i<str.length;i++){
      ascii = str.charCodeAt(i);
      if(str[i]==' '){
          if(curr.length>0){
             
              curr = new RegExp(curr,'i');
            
              arrayReg.push(curr);
              curr="";
          }
      }else if(ascii>=97 && ascii<=122){
          curr+=str[i];
      }
  }
  if(curr.length>0){
      curr = new RegExp(curr,'i');
      arrayReg.push(curr);
  }
  
}
router.get("/filter/:name", requireLogin, async(req, res) => {
    const name=req.params.name;
    let arrayReg=[];
    generatergx(name,arrayReg);
    const result=await USER.find({name:{ $in: arrayReg }})
    res.json(result);

  
});


router.put("/like", requireLogin, async (req, res) => {
  try {
    let result = await POST.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user._id.valueOf() },
      },
      { new: true }
    ).populate("postedBy", "_id name Photo");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
});

//unlike

router.put("/unlike", requireLogin, async (req, res) => {
  try {
    let result = await POST.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user._id.valueOf() },
      },
      { new: true }
    ).populate("postedBy", "_id name Photo");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
});

router.put("/comment", requireLogin, async (req, res) => {
  try {
    const comment = {
      comment: req.body.text,
      postedBy: req.user._id,
    };
    let result = await POST.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment },
      },
      { new: true }
    )
      .populate("comments.postedBy", "_id name Photo")
      .populate("postedBy", "_id name");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
});


// Api to delete post

router.delete("/deletePost/:postId", requireLogin, async (req, res) => {
  try {
    // console.log(req.params.postId);
    let result = await POST.findOne({ _id: req.params.postId });
    if (result.postedBy._id.toString() == req.user._id.toString()) {
      // console.log("removing")
      const del = await POST.deleteOne({ _id: result._id });
      res.status(200).json();
    } else {
      console.log("other users post");
    }
    // console.log("result is ",result);
  } catch (err) {
    if (err) {
      return res.status(422).json({ error: err });
    }
  }
});

//to show following post

router.get("/myfollowingpost", requireLogin, async (req, res) => {
  try {
    let result = await POST.find({ postedBy: { $in: req.user.following } })
      .populate("postedBy", "_id name Photo")
      .populate("comments.postedBy", "_id name");

    res.json(result);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;

//populate to filter the internal things using groupby
