const { Model, DataTypes } = require('sequelize');

class Proposal extends Model {
    static associate(models) {
        Proposal.belongsTo(models.User, { foreignKey: 'userId' });
        Proposal.hasMany(models.Preference, { foreignKey: 'proposalId' });
    }
}

module.exports = (sequelize) => {
    Proposal.init({
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cost: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        phase: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        sequelize,
        modelName: 'Proposal'
    });
    return Proposal;
};
