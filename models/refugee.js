module.exports = (sequelize, Sequelize) => {
    return sequelize.define("refugee", {
        name: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        sex: Sequelize.STRING,
        rating: Sequelize.DECIMAL,
        personalInformation: Sequelize.STRING,
        lookingFor: Sequelize.STRING,
        votes: Sequelize.INTEGER,
        phone: Sequelize.STRING,
        address: Sequelize.STRING,
    });
}
