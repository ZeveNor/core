import User from "../../schema/user.js";
import crypto from "crypto";
import sendEmail from "../../utils/sendEmail.js";
import env from "dotenv";
env.config();

const sendResetEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; 

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    // const resetUrl = `${process.env.frontend_url}/reset-password/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a put request to: \n\n ${resetToken}`;

    await sendEmail(user.email, "Password Reset Request", message);

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending password reset email", error });
  }
};

export default sendResetEmail;