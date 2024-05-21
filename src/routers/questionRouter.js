import { Router } from "express";
import { QuestionController } from "../controllers/questionController.js";
import { requestBodyValidator } from "../middlewares/json/requestBodyValidator.js"
import { questionSchema } from "../middlewares/json/schemas/questionSchema.js";
import * as questionErrorHandler from "../middlewares/exceptions/questionErrorHandler.js";
import * as userGroupErrorHandler from "../middlewares/exceptions/userGroupErrorHandler.js";
export const questionRouter = new Router();

questionRouter.get("/",
    QuestionController.findAll
)

questionRouter.post("/",
    requestBodyValidator(questionSchema),
    userGroupErrorHandler.exists(true, false),
    QuestionController.create
)

questionRouter.get("/:id",
    questionErrorHandler.exists(false),
    QuestionController.findById
)

questionRouter.delete("/:id",
    questionErrorHandler.exists(false),
    QuestionController.deleteById
)

questionRouter.put("/:id",
    requestBodyValidator(questionSchema),
    questionErrorHandler.exists(false),
    userGroupErrorHandler.exists(true, false),
    QuestionController.update
)
