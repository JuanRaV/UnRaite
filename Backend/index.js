import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import adminRoutes from './routes/adminRoutes.js'
import userRoutes from './routes/userRoutes.js'
import driverRoutes from './routes/driverRoutes.js'
import passengerRoutes from './routes/passengerRoutes.js'
import townRoutes from './routes/townRoutes.js'


const app = express();

app.use(express.json())

dotenv.config()

// const whiteList = [process.env.FRONTEND_URL] 
   
// const corsOptions = {
//   origin: function(origin, callback){
//     if(whiteList.includes(origin))
//       callback(null,true) //Can consult API
//     else
//       callback(new Error('CORS error')) //Request won't be permited
//   }
// }

app.use(cors())



//Routes
app.use('/admin',adminRoutes)
app.use('/api/users', userRoutes)
app.use("/driver", driverRoutes)
app.use('/passenger', passengerRoutes)
app.use('/towns', townRoutes)

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// 