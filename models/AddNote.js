const { DataTypes } = require('sequelize');
const sequelizeDb = require('../sequalizeDb'); 

const AddNotes = sequelizeDb.define('AddNotes', {

    userid: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
   
    Title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
   
    Message: {
        type: DataTypes.STRING,
        allowNull: false,
    },  

    file_name: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
}, {
    timestamps: true
});


(async () => {
    try {
        await AddNotes.sync({ alter: true }); // Alter the table if changes are needed (development only)
        console.log('AddNotes table has been created (if it didn\'t already exist).');
    } catch (error) {
        console.error('Unable to create table:', error);
    }
})();

module.exports = AddNotes;
