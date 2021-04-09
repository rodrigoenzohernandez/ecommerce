const db = require("../database/models");
var _ = require('lodash');

module.exports = {
    setupDone: async function () {
        const { rows } = (await db.sequelize.query(`SHOW TABLES`));
        return await Promise.resolve(!_.isEmpty(rows));
    }
}