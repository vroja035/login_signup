require('dotenv').config();

const express = require('express');
const connectDB = require('./src/config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//routes
const userRoutes = require('./src/routes/userRoutes')

//express app
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL,
}));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
});

//routes
app.use('/api/user', userRoutes);

//MongoDB connection & starting server
connectDB();
app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));