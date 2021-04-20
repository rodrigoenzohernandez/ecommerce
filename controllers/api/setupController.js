const setupService = require("../../services/setupService");
const db = require("../../database/models");

const setupController = {

    setup: async function (req, res) {

        db.sequelize.query('show tables')
            .then(data => {
                const rowsQuantity = data[0].length;
                if (rowsQuantity) {
                    return res.status(200).json({ setup: 'La base de datos tiene tablas' });
                }
                else {
                    setupService.setup();
                    return res.status(200).json({ setup: 'La base de datos fue creada y populada' });
                }

            });

    }
}

module.exports = setupController;