const { Model, DataTypes } = require('sequelize');

class Budget extends Model {
    static associate(models) {
        // Define associations here if any
    }
}

module.exports = (sequelize) => {
    Budget.init({
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Budget'
    });
    return Budget;
};
