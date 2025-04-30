import userModel from "../models/userModel.js";

const registerUser = async (req, res) => {
   const { name, email, password } = req.body;
   await userModel.create({ name, email, password });
   res.render('home');
};

export default registerUser ;