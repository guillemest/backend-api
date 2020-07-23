const mongo = require('./../database/mongo');
const {
    ObjectID
} = require('mongodb');
const collectionName = 'colores';
const express = require('express');
const Router = express.Router();
const js2xmlparser = require("js2xmlparser");
const requestValidator = require('../validators/request.validator');

/**
 * @api {get} /colores/ Obtener colores
 * @apiGroup Colores
 * 
 * @apiParam {Number} limit Cantidad de registros.
 * @apiParam {Number} page  Pagina a solicitar.
 * @apiParam {Number} xmlResponse Si se desea la respuesta en xml enviar en 1.
 *
 * @apiSuccess {String} Name    Nombre del color.
 * @apiSuccess {String} Color   Cadena RGB del color.
 * @apiSuccess {String} Pantone Control del color.
 * @apiSuccess {String} Year    Año del color.
 *
 * @apiSuccessExample JSON Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "_id": "5f17a99fe29f02e6b5f009fa",
 *       "Name": "Sand Dollar",
 *       "Color": "#DECDBE"
 *       "Pantone": "13-1106"
 *       "Year": 2020
 *     }]
 *
 * @apiSuccessExample JSON Success-Response:
 *     HTTP/1.1 200 OK
 *     []
 *
 * @apiSuccessExample XML Success-Response:
 *     HTTP/1.1 200 OK
 *      <?xml version='1.0'?>
 *      <result>
 *          <result>
 *              <Id>5f19a216c15e4f84482974da</Id>
 *              <Name>Sand Dollar</Name>
 *              <Color>#DECDBE</Color>
 *              <Pantone>13-1106</Pantone>
 *              <Year>2020</Year>
 *          </result>
 *          <total>1</total>
 *          <currentPage>1</currentPage>
 *          <pages>1</pages>
 *      </result>
 *
 * @apiSuccessExample XML Success-Response:
 *     HTTP/1.1 200 OK
 *      <?xml version='1.0'?>
 *      <result>
 *          <total>0</total>
 *          <currentPage>1</currentPage>
 *          <pages>0</pages>
 *      </result>
 *
 */
Router.get('/', (req, res) => {
    const limit = +req.query.limit || 6;
    const currentPage = +req.query.page || 1;
    const returnXmlType = +req.query.xmlResponse === 1 ? true : false || false;
    const skip = currentPage === 1 ? 0 : (currentPage - 1) * limit;
    const database = mongo.getDatabase();
    database.collection(collectionName).countDocuments().then(t => {
        database.collection(collectionName)
            .find({})
            .skip(skip)
            .limit(limit)
            .toArray()
            .then(data => {
                const totalRecords = t;
                const pages = totalRecords / limit;
                const totalPages = Math.ceil(pages);
                if (returnXmlType === false) {
                    res.send({
                        result: data,
                        total: totalRecords,
                        currentPage: currentPage,
                        pages: totalPages
                    });
                } else {
                    try {
                        res.set('Content-Type', 'text/xml');
                        const noSpecCahar = data.map((d) => {
                            return {
                                Id: new ObjectID(d._id).toString(),
                                Name: d.Name,
                                Color: d.Color,
                                Pantone: d.Pantone,
                                Year: d.Year
                            }
                        })
                        const xmlRes = js2xmlparser.parse("result", {
                            result: noSpecCahar,
                            total: totalRecords,
                            currentPage: currentPage,
                            pages: totalPages
                        })
                        res.send(xmlRes);
                    } catch (e) {
                        res.status(500).send('Error interno');
                    }
                }
            });
    });

});


/**
 * @api {get} /colores/:id Obtener color
 * @apiGroup Colores
 *
 * @apiParam {Number} id Id del color.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "5f17a99fe29f02e6b5f009fa",
 *       "Name": "Sand Dollar",
 *       "Color": "#DECDBE"
 *       "Pantone": "13-1106"
 *       "Year": 2020
 *     }
 *
 * @apiError ColorNotFound Color no encontrado.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "message": "Color no encontrado"
 *     }
 */

Router.get('/:id', (req, res) => {
    const database = mongo.getDatabase();
    database.collection(collectionName).findOne({
        _id: new ObjectID(req.params.id),
    }).then(result => {
        if (result) {
            res.send(result);
        } else {
            res.status(400).send({
                message: "Color no encontrado"
            });
        }
    })
});


/**
 * @api {post} /colores/ Crear color
 * @apiGroup Colores
 *
 * @apiSuccess {String} Name    Nombre del color.
 * @apiSuccess {String} Color   Cadena RGB del color.
 * @apiSuccess {String} Pantone Control del color.
 * @apiSuccess {String} Year    Año del color.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Color creado correctamente",
 *     }
 *
 * @apiError ServerError Error de servidor.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Error interno"
 *     }
 */
Router.post('', requestValidator.validateRequestBody, (req, res) => {
    const database = mongo.getDatabase();
    database.collection(collectionName).insertOne(req.body).then(result => {
        if (result && result.insertedId) {
            res.send({
                message: "Color creado correctamente"
            });
        } else {
            res.status(500).send({
                message: "Error interno"
            });
        }

    });
});


/**
 * @api {put} /colores/:id Actualizar color
 * @apiGroup Colores
 *
 * @apiParam {Number} id Id del color.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Color actualizado correctamente"
 *     }
 *
 * @apiError ColorNotFound Color no encontrado.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "message": "Color no encontrado"
 *     }
 */
Router.put('/:id', requestValidator.validateRequestParams, (req, res) => {
    const database = mongo.getDatabase();
    const data = req.body;
    delete data._id;
    database.collection(collectionName).update({
        _id: new ObjectID(req.params.id),
    }, {
        $set: {
            ...req.body,
        },
    }, ).then(result => {
        if (result && result.nModified === 1) {
            res.send({
                message: "Color actualizado correctamente"
            });
        } else {
            res.status(400).send({
                message: "Color no encontrado"
            });
        }
    });
});

/**
 * @api {delete} /colores/:id Eliminar color
 * @apiGroup Colores
 *
 * @apiParam {Number} id Id del color.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Color eliminado correctamente"
 *     }
 *
 * @apiError ColorNotFound Color no encontrado.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "message": "Color no encontrado"
 *     }
 */
Router.delete('/:id', requestValidator.validateRequestParams, (req, res) => {
    const database = mongo.getDatabase();
    database.collection(collectionName).deleteOne({
        _id: new ObjectID(req.params.id),
    }).then(result => {
        if (result && result.deletedCount === 1) {
            res.send({
                message: "Color eliminado correctamente"
            });
        } else {
            res.status(400).send({
                message: "Color no encontrado"
            });
        }
    })
});

module.exports = Router;