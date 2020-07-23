exports.validateRequestBody = (req, res, next) => {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(500).send({
            messsage: "empty body"
        });
    }

    if (req.get('Authorization') !== 'admin') {
        res.status(401).send({
            message: 'No autorizado para realizar esta operación.'
        });
        return;
    }

    next();
}

exports.validateRequestParams = (req, res, next) => {

    if (req.get('Authorization') !== 'admin') {
        res.status(401).send({
            message: 'No autorizado para realizar esta operación.'
        });
        return;
    }

    next();
}