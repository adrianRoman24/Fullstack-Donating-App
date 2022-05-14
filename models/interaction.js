module.exports = (sequelize, Sequelize) => {
    return sequelize.define("interaction", {
        refugeeEmail: {
            type: Sequelize.STRING,
            references: {
                model: "refugees",
                key: "email",
            }
        },
        donorEmail: {
            type: Sequelize.STRING,
            references: {
                model: "donors",
                key: "email",
            }
        },
        offerId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'offers',
                key: 'id',
            }
        },
        requestId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'requests',
                key: 'id',
            }
        }
    });
}
