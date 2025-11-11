const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve all static files (CSS, JS, images)
app.use(express.static(__dirname));

// ✅ Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ Gmail SMTP Transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vaibhavdaspute775@gmail.com",   // ✅ तुझा Gmail
    pass: "wwvk jhdz mtzf rtcn"            // ✅ Gmail App Password
  }
});

// ✅ API Route
app.post("/sendmail", (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailOptions = {
    from: "vaibhavdaspute775@gmail.com",          // ✅ FROM must be YOUR Gmail
    replyTo: email,                                // ✅ User ला reply यावर जाईल
    to: "vaibhavdaspute775@gmail.com",             // ✅ मेल इथे येणार
    subject: "Portfolio Inquiry - Vaibhav Daspute", // ✅ तुझा मागितलेला subject
    text: `
Portfolio Inquiry Received

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
`
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
      return res.send("Failed to send ❌");
    }
    return res.send("Message Sent Successfully ✅");
  });
});

// ✅ Start Server
app.listen(1000, () => {
  console.log("Server running on http://localhost:1000");
});
