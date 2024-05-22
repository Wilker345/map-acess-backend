import express from 'express';
import cors from 'cors';
import { config } from "./config.js"
import { userGroupRouter } from "./src/routers/userGroupRouter.js";
import { errorHandler } from "./src/middlewares/exceptions/errorHandler.js";
import { userRouter } from "./src/routers/userRouter.js";
import { questionRouter } from "./src/routers/questionRouter.js";
import { answerRouter } from "./src/routers/answerRouter.js"


const app = express();

app.use(express.json());
app.use(cors({
    origin: config.CORS
}));

app.use('/user-groups', userGroupRouter)
app.use('/users', userRouter)
app.use('/questions', questionRouter)
app.use('/answers', answerRouter)

app.use(errorHandler)

app.listen(config.PORT, () => console.log("Server is running on the current configuration:", config));
