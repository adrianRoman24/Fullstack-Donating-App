module.exports = (sequelize, Sequelize) => {
    return sequelize.define("interaction", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        offerId: {
            type: Sequelize.STRING,
            references: {
                model: 'offer',
                key: 'id',
            }
        },
        requestId: {
            references: {
                model: 'request',
                key: 'id',
            }
        }
    });
}
