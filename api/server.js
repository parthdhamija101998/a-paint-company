const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true });
    console.log("MongoDB connection established successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

connectToMongoDB();

const paintsRouter = require('./routes/paints');
const usersRouter = require('./routes/users');

app.use('/paints', paintsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
