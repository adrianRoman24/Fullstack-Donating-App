const { initRabbit, consumeRabbitAlert, log } = require("./utils");
const config = require("../config/config.json");
const nodemailer = require('nodemailer');

async function main() {
    const channel = await initRabbit();
    const transporter = nodemailer.createTransport({
        service: config.MAIL_SERVICE,
        auth: {
          user: config.MAIL_USER,
          pass: config.MAIL_PASSWORD,
        },
    });

    channel.consume(config.RABBIT_QUEUE, async (message) => {
        log("Received rabbit alert");
        const alert = JSON.parse(message.content.toString());
        log(JSON.stringify(alert));

        const mailOptions = {
            from: config.MAIL_USER,
            to: alert.email,
            subject: alert.subject,
            text: alert.body,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              log("Email sent");
              log(info.response);
            }
          });
    }, {
        noAck: true,
    });
};

main();
