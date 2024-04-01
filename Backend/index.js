import express from 'express'
import userRoutes from './routes/userRoutes.js'

const app = express();

app.use(express.json())

//Routes
app.use('/api/users', userRoutes)

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
