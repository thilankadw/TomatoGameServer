const User = require("../models/userModel");
const { createAccessToken, createRefreshToken } = require("../utils/secretToken");
const bcrypt = require('bcrypt');

module.exports.Signup = async (req, res) => {

  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    const user = await User.create({ username, password });

    if (!user) {
      return res.status(400).json({ message: "Registration is not sucess.", success: false });
    }

    if(user){
      const accessToken = createAccessToken(user);
      const refreshToken = createRefreshToken(user);

      res
      .status(201)
      .json({ message: "User signed in successfully", success: true, accessToken: accessToken, refreshToken: refreshToken, userId: user._id });
    }

  }catch (error) {

    console.error(error);
    res.status(500).json({ message: "An error occurred during registration.", success: false });

  }

};

module.exports.Login = async (req, res) => {

  try {

    const { username, password } = req.body;

    if(!username || !password ){
      return res.status(400).json({message:'All fields are required', success: false})
    }

    const user = await User.findOne({ username });

    if(!user){
      return res.status(400).json({message:'User Not Found!!!', success: false })  
    }

    const auth = await bcrypt.compare(password, user.password)

    if (!auth) {
      return res.status(400).json({message:'Error in auth', success: false }) 
    }

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    res
      .status(201)
      .json({ message: "User logged in successfully", success: true, refreshToken: refreshToken, accessToken: accessToken, userId: user._id });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'An error occurred during login.', success: false });

  }
};

module.exports.GetUserDetails = async (req,res) => {

  try {

    const id = req.params.id;

    const user = await User.findById(_id = id);

    if (!user) {
        return res.status(400).json({message:"User not found.", success: true,});
    }

    if (user) {
        res
            .status(201)
            .json({ message: "User details found.", success: true, userDetails: user});
    }
    
  } catch (error) {
      
      console.error(error);
      res.status(500).json({ message: "An error occurred.", success: false });

  }
};

module.exports.UpdateScore = async (req, res) => {
  try {
    const { userId, score } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found.", success: false });
    }

    user.score = score;
    await user.save();

    res.status(200).json({ message: "User score updated successfully.", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred.", success: false });
  }
};

module.exports.GetTopScorers = async (req, res) => {
  try {

    const topUsers = await User.find().sort({ score: -1 }).limit(10);

    res.status(200).json({ success: true, topUsers });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "An error occurred.", success: false });

  }
};