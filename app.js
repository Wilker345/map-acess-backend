import express from 'express';
import cors from 'cors';
import { userTypeRouter } from "./src/routers/userTypeRouter.js";
import { errorHandler } from "./src/middlewares/exceptions/errorHandler.js";
import { userRouter } from "./src/routers/userRouter.js";


const app = express();

app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use('/user-types', userTypeRouter)
app.use('/users', userRouter)

app.use(errorHandler)

const port = 8000
app.listen(port, () => console.log(`Server is running on port: ${port}`));
