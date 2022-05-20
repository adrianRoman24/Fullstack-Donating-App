const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const amqpUri = require("amqp-uri");
const amqp = require("amqp-connection-manager");

const config = require("../config/config.json");

exports.log = (toLog, type="LOG") => {
    let string = null;
    if (typeof(toLog) === "object") {
        string = JSON.stringify(toLog);
    } else {
        string = toLog;
    }
    console.log(`[${new Date().toISOString()}] [${type}] ${string}`);
}

exports.jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: config.JWKS_CACHE,
        rateLimit: config.JWKS_RATE_LIMIT,
        jwksRequestsPerMinute: config.JWKS_REQUESTS_PER_MINUTE,
        jwksUri: config.JWKS_URI,
      }),
      audience: config.JWT_AUDIENCE,
      issuer: config.JWT_ISSUER,
      algorithms: config.JWT_ALGORITHMS
});

exports.initRabbit = async () => {
    const s = amqpUri({
        ssl: false,
        host: config.RABBIT_HOST,
        user: config.RABBIT_USER,
        password: config.RABBIT_PASSWORD,
        vhost: config.RABBIT_VHOST,
    });

    const connection = await amqp.connect(s);

    connection.on("connect", () => {
        this.log("Rabbitmq connected to host");
    });

    connection.on("disconnect", () => {
        this.log("Rabbitmq disconnected", "WARN");
    });

    connection.on("connectFailed", (error) => {
        this.log("Rabbitmq connection failed", "WARN");
        console.log(error)
    });

    const channel = connection.createChannel({
        setup(channel) {
            channel.assertQueue(config.RABBIT_QUEUE, {
                durable: true,
            });
            channel.checkQueue(config.RABBIT_QUEUE);
        }
    });

    channel.on("error", (error) => {
        this.log(`Rabbit channel error: ${error.message}`);
    });

    await channel.waitForConnect();
    return channel;
}

exports.publishRabbitAlert = async (channel, data) => {
    const sent = await channel.sendToQueue(config.RABBIT_QUEUE, Buffer.from(JSON.stringify(data)), {
        persistent: true,
        contentType: "application/json",
    });
    return sent;
};

exports.consumeRabbitAlert = async (channel) => {
    channel.consume(config.RABBIT_QUEUE, async (message) => {
        this.log("Received rabbit message");
        console.log(JSON.parse(message.content.toString()));
    });
};

exports.isUserRegistered = async (req) => {
    const registeredAsDonor = await require("../controller/donor.controller").getByEmail(req);
    if (registeredAsDonor.result.donor !== null) {
        return true;
    }

    const registeredAsRefugee = await require("../controller/refugee.controller").getByEmail(req);
    if (registeredAsRefugee.result.refugee !== null) {
        return true;
    }
    return false;
}
