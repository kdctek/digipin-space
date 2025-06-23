const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const digipinRoutes = require('./routes/digipin.routes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');
const path = require('path');

// const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
const swaggerDocument = YAML.parse(fs.readFileSync(path.join(__dirname, '../swagger.yaml'), 'utf8'));

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Swagger Docs Route
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// DIGIPIN API Routes
app.use('/api', digipinRoutes);

module.exports = app;
