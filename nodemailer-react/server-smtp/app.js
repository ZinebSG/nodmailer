const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

function sendEmail({ email, subject, message }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tnodemailler@gmail.com",
        pass: "ittu zzed ewxc yker",
      },
    });

    const mail_configs = {
      from: email,
      to: "tnodemailler@gmail.com",
      subject: subject,
      html: `
      <p>Bonjour, vous avez un mail de votre site reçcu de :${email}</p>
      <p>${message}</p>
      <p>Best Regards</p>
      `,
    };

    const mail_confirmation_configs = {
      from: "tnodemailler@gmail.com",
      to: email,
      subject: subject,
      html: `
      <p>Bonjour, nous avons bien reçu votre message :</p>
      <p>${message}</p>
      <p>Best Regards</p>
      `,
    };

    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      return resolve({ message: "Email sent successfully" });
    });
    transporter.sendMail(mail_confirmation_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      return resolve({ message: "Email sent successfully" });
    });
  });
}

app.get("/", (req, res) => {
  sendEmail(req.query)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});
