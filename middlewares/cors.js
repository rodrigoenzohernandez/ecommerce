/*
Objetivo: Evitar el error de cross origin al querer consumir las APIs del ecommerce desde el dashboard de REACT. Sucede porque son dos sitios con dominios diferentes
1 --> Va el dominio del sitio que va a consumir las APIs del ecommerce
*/

const cors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //1
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
};

module.exports = cors;