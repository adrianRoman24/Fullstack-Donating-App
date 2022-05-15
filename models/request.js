module.exports = (sequelize, Sequelize) => {
    return sequelize.define("request", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        donorEmail: {
            type: Sequelize.STRING,
            references: {
                model: 'donors',
                key: 'email',
            },
        },
        description: Sequelize.STRING,
        count: Sequelize.INTEGER,
        date: Sequelize.DATE,
        status: Sequelize.STRING,
    });
}
