import express from "express";
import Post from "../model/postModel.js";

const router = express.Router();
//route for getting all  posts
router.get("/all", async (req, res) => {
  console.log("get all db");
  try{

    const skipped = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0

    const data = await Post.find({}).skip(skipped).limit(5);

    if(data.length<=0){
      return res.status(200).json({ "success":true, "posts": data, dataEmpty:true });    
    }

    return res.status(200).json({ "success":true, size:data.length, "posts": data, skiprows:skipped+5 });

  }catch(err){
    return res.status(200).json({ "success":"false", "errorMessage":err.message });

  }
});


//route for getting a specific post
router.get("/:id", async (req, res) => {

  try{
    const postId = req.params.id;
    const postData = await Post.findById(postId);
    if (postData) {
      return res.status(200).json({ Post: postData });
    } else {
      return res.status(404).send({ success:false, msg: "Post Not Found" });
    }
  }catch(err){
    return res.status(404).send({ success:false, msg: err.message });
  }
});

//route for creating a new Post
router.post("/", async (req, res) => {
  try{
    console.log("body",req.body);
    const { Sports_Name,Article_Title, Article_Content , Article_Author, Article_Image_Link} = req.body;
  
    if (!Sports_Name || !Article_Title || !Article_Content  || !Article_Author || !Article_Image_Link ) {
      return res
        .status(400)
        .json({ errorMessage: "Please fill complete fields !" });
    }
  
    const newArticle = new Post({
      Sports_Name,
      Article_Title,
      Article_Content,
      Article_Author,
      Article_Image_Link
    });
  
    const Articlepost = await newArticle.save();
  
    if (Articlepost) {
      return res
        .status(201)
        .send({ message: "New Post Created", data: Articlepost });
    }
    return res.status(500).send({ success:false, message: " Error in Creating Article." });

  }catch(err){
    return res.status(500).send({ success:false, message: err.message });

  }
});

//route for a user who can removing a post with id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deletedProduct = await Post.findByIdAndDelete({_id:id});
    if (deletedProduct) {
      res.status(202).send({success:true, message: "Post Deleted" });
    } else {
      res.statu(404).send({success:false, err:"Error in Deletion."});
    }
  } catch (err) {
    res.status(404).send({success:false, errorMessage: "Post not found" });
  }
});

//route for updating the Post
router.put("/:id", async (req, res) => {
  try {
    const updatePost = req.body;
    const updatedPost = await Post.updateOne(
      { _id: req.params.id },
      updatePost
    );
    res.status(201).json({ "Data updated ": updatedPost });
  } catch (err) {
    res.status(404).json({ errorMessage: "Error in Updating Unkown Post " });
  }
});

export default router;
