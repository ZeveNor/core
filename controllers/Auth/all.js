import User from "../../schema/user.js";
import env from "dotenv";
env.config();

const allUser = async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    console.log("Gott an error", error);
  }
}

export default allUser;