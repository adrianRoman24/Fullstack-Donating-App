module.exports = (sequelize, Sequelize) => {
    return sequelize.define("refugee", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rating: Sequelize.DECIMAL,
        email: Sequelize.STRING,
        name: Sequelize.STRING,
        phone: Sequelize.STRING,
        address: Sequelize.STRING,
    });
}
