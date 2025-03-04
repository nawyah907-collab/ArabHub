const fs = require('fs');
const path = require('path');
const sequelize = require('../config/db');

exports.createBackup = async () => {
  try {
    const backupPath = path.join(__dirname, '..', 'backups', `backup-${Date.now()}.sql`);
    const query = await sequelize.query('SHOW TABLES', { type: sequelize.QueryTypes.SELECT });
    const tables = query.map((row) => Object.values(row)[0]);

    let backupContent = '';
    for (const table of tables) {
      const data = await sequelize.query(`SELECT * FROM ${table}`, { type: sequelize.QueryTypes.SELECT });
      backupContent += `-- Table: ${table}\n`;
      backupContent += `INSERT INTO ${table} VALUES\n`;
      data.forEach((row) => {
        backupContent += `(${Object.values(row).map((val) => `'${val}'`).join(', ')}),\n`;
      });
      backupContent += ';\n\n';
    }

    fs.writeFileSync(backupPath, backupContent);
    console.log(`Backup created at ${backupPath}`);
  } catch (error) {
    console.error('Error creating backup:', error);
  }
};