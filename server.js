const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve all frontend files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// ✅ Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Gmail SMTP Transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vaibhavdaspute775@gmail.com",
    pass: "wwvk jhdz mtzf rtcn"
  }
});

// ✅ API Route
app.post("/sendmail", (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailOptions = {
    from: "vaibhavdaspute775@gmail.com",
    replyTo: email,
    to: "vaibhavdaspute775@gmail.com",
    subject: "Portfolio Inquiry - Vaibhav Daspute",
    text: `Portfolio Inquiry Received

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}`
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) return res.send("Failed to send ❌");
    return res.send("Message Sent Successfully ✅");
  });
});

// ✅ Use PORT from Render or fallback
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on PORT:", PORT));
