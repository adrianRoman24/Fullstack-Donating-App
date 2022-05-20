const { initRabbit, publishRabbitAlert, consumeRabbitAlert } = require("./utils");

async function test() {
    const channel = await initRabbit();
    const sent = await publishRabbitAlert(channel, {
        email: "adrian_roman99@yahoo.com",
        body: "New request from refugee Alex",
        subject: "New Request - Donating App"
    });
    console.log(sent);
    // await consumeRabbitAlert(channel);
}

test();
