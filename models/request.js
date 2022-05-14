module.exports = (sequelize, Sequelize) => {
    return sequelize.define("request", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        offerId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'offers',
                key: 'id',
            }
        },
        refugeeEmail: {
            type: Sequelize.STRING,
            references: {
                model: 'refugees',
                key: 'email',
            }
        },
        description: Sequelize.STRING,
        count: Sequelize.DECIMAL,
        date: Sequelize.DATE,
    });
}
