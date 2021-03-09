let db = require("../../database/models");
var Op = db.Sequelize.Op;

const usersAPIController = {

    total: function (req, res) {

        try {
            db.Usuarios.findAndCountAll({limit: 1})
                .then(function (users) {

                    let totalUsers = {

                        meta: {

                            status: 200,
                            endpoint: '/api/users'
                        },

                        data: { total: users.count}
                    };

                    res.json(totalUsers);
                });
        } catch (error) {

            console.log(error)
        }
    }
}

module.exports = usersAPIController;