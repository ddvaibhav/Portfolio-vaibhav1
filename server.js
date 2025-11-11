const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve all static files
app.use(express.static(__dirname));

// ✅ Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ Gmail SMTP (App Password Required)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vaibhavdaspute775@gmail.com",
    pass: "wwvk jhdz mtzf rtcn"
  }
});

// ✅ API route
app.post("/sendmail", (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailOptions = {
    from: "vaibhavdaspute775@gmail.com",
    replyTo: email,
    to: "vaibhavdaspute775@gmail.com",
    subject: "Portfolio Inquiry - Vaibhav Daspute",
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

// ✅ Render PORT fix — MOST IMPORTANT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("✅ Server running on PORT:", PORT);
});
