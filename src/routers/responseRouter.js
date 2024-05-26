import { Router } from "express";
import { ResponseController } from "../controllers/responseController.js";
import { requestBodyValidator } from "../middlewares/json/requestBodyValidator.js"
import { responseSchema } from "../middlewares/json/schemas/responseSchema.js";
import * as responseErrorHandler from "../middlewares/exceptions/responseErrorHandler.js";
import * as answerErrorHandler from "../middlewares/exceptions/answerErrorHandler.js";
import * as userErrorHandler from "../middlewares/exceptions/userErrorHandler.js"

export const responseRouter = new Router();

responseRouter.get("/",
    ResponseController.findAll
)

responseRouter.post("/",
    requestBodyValidator(responseSchema),
    answerErrorHandler.exists(true, true),
    userErrorHandler.exists(true),
    ResponseController.create
)

responseRouter.get("/:id",
    responseErrorHandler.exists(false),
    ResponseController.findById
)

responseRouter.delete("/:id",
    responseErrorHandler.exists(false),
    ResponseController.deleteById
)

responseRouter.put("/:id",
    requestBodyValidator(responseSchema),
    responseErrorHandler.exists(false),
    answerErrorHandler.exists(true, true),
    userErrorHandler.exists(true),
    ResponseController.update
)

responseRouter.get("/:id/report",
    responseErrorHandler.exists(false),
    ResponseController.sendReport,
)