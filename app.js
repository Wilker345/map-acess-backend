import express from 'express';
import cors from 'cors';
import { userGroupRouter } from "./src/routers/userGroupRouter.js";
import { errorHandler } from "./src/middlewares/exceptions/errorHandler.js";
import { userRouter } from "./src/routers/userRouter.js";
import { questionRouter } from "./src/routers/questionRouter.js";


const app = express();

app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use('/user-groups', userGroupRouter)
app.use('/users', userRouter)
app.use('/questions', questionRouter)

app.use(errorHandler)

const port = 8000
app.listen(port, () => console.log(`Server is running on port: ${port}`));
