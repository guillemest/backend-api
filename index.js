const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./api/routes/main-routes');
const mongo = require('./api/database/mongo');

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(morgan('combined'));

app.use('/apidoc', express.static('doc'));
app.use('/api', routes);

app.get("/", (req, res) => {
    res.json({
        message: "Backend API - Documentación: http://localhost:8080/apidoc/"
    });
});

app.use((req, res, next) => {

    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

mongo.startDatabase().then(() => {
    const PORT = 8080;
    app.listen(PORT, () => {
        console.log(`Server ejecutandose en puerto: ${PORT} - Documentación: http://localhost:${PORT}/apidoc/`);
    });
});