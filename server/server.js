import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import clerkWebhooks from './controllers/webhooks.js';

// Initialize Express app
const app = express();

//Connect to MongoDB
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get('/', (req, res) => res.send('I am On!'));
app.post('/clerk', clerkWebhooks); 

//Port configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
