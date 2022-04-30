const mongoose=require('mongoose');
const {Schema}=mongoose;

const userSchema=new Schema({
    googleID: String,
    credits: {type: Number, default: 0}
});

// creating the users collection with userSchema 
mongoose.model('users',userSchema);