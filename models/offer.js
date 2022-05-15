module.exports = (sequelize, Sequelize) => {
    return sequelize.define("offer", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        location: Sequelize.STRING,
        donorEmail: {
            type: Sequelize.STRING,
            references: {
                model: 'donors',
                key: 'email',
            },
        },
        type: Sequelize.STRING,
        description: Sequelize.STRING,
        capacity: Sequelize.INTEGER,
        date: Sequelize.DATE,
    });
}
