const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
    static associate(models) {
        // Define associations here if any
    }
}

module.exports = (sequelize) => {
    User.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'member' // Default role can be 'member'
        }
    }, {
        sequelize,
        modelName: 'User',
        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    });
    return User;
};
