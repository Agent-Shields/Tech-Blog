const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection')

// Create User model
class User extends Model {
    //set up method to run on instance data (per user) to check password refer to Module 14 lessons 2 and 3  
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5]
            }
        }
    },
    {
        hooks: {
            // setup beforeCreate lifecycle "hook" functionality
           async beforeCreate(newUserData) {
               newUserData.password = await bcrypt.hash(newUserData.password, 10);
               return newUserData;
            },
            // setup beforeUpdate lifecycle 'hook' functionality, meaning we will fire this hook when the user wants to update password
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
)

module.exports = User;