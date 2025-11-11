const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// ✅ Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vaibhavdaspute775@gmail.com",
    pass: "wwvk jhdz mtzf rtcn" // App password
  }
});

// ✅ API route
app.post("/sendmail", (req, res) => {
  const { name, email, phone, message } = req.body;
  const mailOptions = {
    from: "vaibhavdaspute775@gmail.com",
    replyTo: email,
    to: "vaibhavdaspute775@gmail.com",
    subject: "Portfolio Inquiry",
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n${message}`
  };
  transporter.sendMail(mailOptions, (err) => {
    if(err) return res.send("Failed ❌");
    return res.send("Sent ✅");
  });
});

// ✅ Dynamic port for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on PORT:", PORT));
