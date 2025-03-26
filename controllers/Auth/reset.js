import User from "../../schema/user.js";
import bcrypt from "bcrypt";
import createSecretToken from "../../utils/genToken.js";
import saveEvent from "../../utils/saveEvent.js";
import env from "dotenv";
env.config();

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    const token = createSecretToken(user._id);

    saveEvent({
      event_name: "Password Reset",
      event_owner: user._id,
      event_owner_name: user.username,
      description: `${user.username} has successfully reset their password`,
      event_status: "Success",
      event_type: "User",
      event_type_id: user._id,
    });

    res.status(200).json({ message: "Password reset successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
  }
};

export default resetPassword;