require('dotenv').config()
const express = require('express');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes')
const cookieParser = require('cookie-parser'); // cookie-parser is a middleware in Express that helps your server read and manage cookies sent by the browser.

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

module.exports = app;