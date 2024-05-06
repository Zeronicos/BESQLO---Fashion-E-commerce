const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { type } = require("os");
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/productRoutes.js');
app.use('/', routes);
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// Image storage configuration
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Serve uploaded images
app.use('/images', express.static('upload/images'));

// Upload image endpoint
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})