import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

// Basic error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!!!`);
});

app.use('/api/user', userRouter)
app.use('/api/auth',authRouter)
