const { Model, DataTypes } = require('sequelize');

class Preference extends Model {
    static associate(models) {
        Preference.belongsTo(models.User, { foreignKey: 'userId' });
        Preference.belongsTo(models.Proposal, { foreignKey: 'proposalId' });
    }
}

module.exports = (sequelize) => {
    Preference.init({
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'Preference'
    });
    return Preference;
};
