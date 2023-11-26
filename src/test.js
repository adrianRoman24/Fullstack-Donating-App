const { initRabbit, publishRabbitAlert, consumeRabbitAlert } = require("./utils");
const nodemailer = require('nodemailer');
const config = require("../config/config.json");

async function test() {
    const channel = await initRabbit();
    const sent = await publishRabbitAlert(channel, {
        email: "adrian_roman99@yahoo.com",
        body: "New request from refugee Alex",
        subject: "New Request - Donating App"
    });
    console.log(sent);
    await consumeRabbitAlert(channel);
    console.log('Consumed')

    const transporter = nodemailer.createTransport({
        host: config.MAIL_HOST,
        port: config.MAIL_PORT,
        secure: true,
        auth: {
          user: config.MAIL_USER,
          pass: config.MAIL_PASSWORD,
        },
    });
    const mailOptions = {
        from: config.MAIL_USER,
        to: 'adrian_roman99@yahoo.com',
        subject: 'sibject',
        text: 'text',
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          log("Email sent");
          log(info.response);
        }
      });
}

test();
