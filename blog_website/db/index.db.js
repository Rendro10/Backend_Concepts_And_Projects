const mongoose = require("mongoose");

async function dbConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected successfully!!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }

    // Add event listeners for monitoring connection state
    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected');
    });

    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
    });

}

module.exports = dbConnection;
