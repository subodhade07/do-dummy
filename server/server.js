import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';

// Initialize Express app
const app = express();

//Connect to MongoDB
await connectDB();

// Middleware
app.use(cors());

//Routes
app.get('/', (req, res) => res.send('I am On!'));
app.post('/clerk', express.json(), './controllers/webhooks.js');

//Port configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


