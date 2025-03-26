import User from "../../schema/user.js";
import bcrypt from "bcrypt";
import createSecretToken from "../../utils/genToken.js"; 
import saveEvent from "../../utils/saveEvent.js";
import env from "dotenv";
env.config();

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json({ message: "All input is required" });
  }
  const user = await User.findOne({ email });
  if (!(user && (await bcrypt.compare(password, user.password)))) {
    return res.status(404).json({ message: "Invalid credentials" });
  }
  const token = createSecretToken(user._id);
  saveEvent(
    {
      event_name: "is just log in",
      event_owner: user._id,
      event_owner_name: user.username,
      description: `${user.username} has already logged in`,
      event_status: "Success",
      event_type: "User",
      event_type_id: user._id,
    }
  )
  res.json({ token });
};

export default login;