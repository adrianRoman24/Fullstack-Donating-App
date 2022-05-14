module.exports = (sequelize, Sequelize) => {
    return sequelize.define("offer", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        refugeeId: {
            type: Sequelize.STRING,
            references: {
                model: 'refugee',
                key: 'email',
            }
        },
        description: Sequelize.STRING,
        count: Sequelize.DECIMAL,
        date: Sequelize.DATE,
    });
}
