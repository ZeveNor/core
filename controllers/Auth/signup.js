import User from "../../schema/user.js";
import bcrypt from "bcrypt";
import createSecretToken from "../../utils/genToken.js";
import saveEvent from "../../utils/saveEvent.js";
import env from "dotenv";
env.config();

const createUser = async (req, res) => {
  try {
    if (
      !(
        req.body.email &&
        req.body.password &&
        req.body.name &&
        req.body.username
      )
    ) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email: req.body.email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      path: "/", 
      expires: new Date(Date.now() + 86400000), 
      secure: true, 
      httpOnly: true, 
      sameSite: "None",
    });

    console.log("cookie set succesfully");
    saveEvent(
      {
        event_name: "is just create account",
        event_owner: user._id,
        event_owner_name: user.username,
        description: `${user.username} has successfully signed up`,
        event_status: "Success",
        event_type: "User",
        event_type_id: user._id,
      }
    )
    res.json(user);
  } catch (error) {
    console.log("Gott an error", error);
  }
};
export default createUser;