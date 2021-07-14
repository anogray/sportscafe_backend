  
import mongoose from 'mongoose';

const sportsSchema = new mongoose.Schema({
  Sports_Name: { type: String, required: true },
  Article_Title : { type: String, required: true },
  Article_Content :{type:String, required: true},
  Article_Image_Link: {type:String, required:true},
  Article_Author :{type:String, required: true},

});

const Post = mongoose.model('post', sportsSchema);

export default Post ;