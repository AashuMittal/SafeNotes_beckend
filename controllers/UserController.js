
const User =require('../models/User')
const AddNote =require('../models/AddNote')
const bcrypt = require('bcryptjs');
 const tokenService = require('../Service/TokenService');
 const multer = require("multer")



 exports.Register= async(req,res)=>{
  const {name,password,email}=req.body;
  const hasspasword=await bcrypt.hash(password,10);
  const user=await User.findOne({where:{name,email}});
  if(user){
      return res.status(500).json({ message: 'User already exist.' });
  }
  const newuser= await User.create({name,password:hasspasword,email});
  const token=tokenService.createToken(newuser.dataValues);
  if(token){
      return res.send({message:"Successfully Registration", token:token})
  }
  else{
     return res.send("No token Generate")
  }

}


exports.Login=async(req,res)=>{
    const{email,password}=req.body;
    let user= await User.findOne({where:{email}})
    if(user){
      return res.json({ success: true, user });
    }
    else{
       return  res.send('User not Found');
    }
}


  
  exports.createNote =async (req, res) => {
    const { Title, Message, userid } = req.body;
    const file = req.file;
  
    if (!file) {
      return res.status(400).json({ Message: 'No file uploaded' });
    }
  
    try {
    
      const newNote = await AddNote.create({
        Title,
        Message,
        userid,
        file_name: file.filename
      });
  
      return res.status(200).json({
        Message: 'Successfully created note',
        note: newNote
      });
    } catch (err) {
      return res.status(500).json({ Message: 'Error creating note', error: err.message });
    }
  };

exports.deleteNote=  async(req,res)=>{
    try{
        const { userid } = req.params;
   
        const user = await AddNote.destroy({ where: { userid } });
    if (user === 0) {
        return res.status(404).send({ Message: "User not found" });
      }
      else{
    return res.status(200).send({Message:"Successfully deleted"});
      }
        
}
catch(error){
    return res.status(500).send({Message:"error"});
}
}

exports.UpdateNote=  async(req,res)=>{
    const{Title,Message}=req.body;
    const{userid}=req.params;
    const user= await AddNote.findOne({where:{userid}})
    if(user){
        user.Title=Title;
        user.Message=Message;

        await user.save();
        res.status(200).send({Message:"Successfully Update"})
    }
    else{
        res.status(500).send({Message:"Error"});
    }
}

exports.Adds= async(req,res)=>{
    const user= await AddNote.findAll()
    return res.send({Message:"Successfully", user});
}
