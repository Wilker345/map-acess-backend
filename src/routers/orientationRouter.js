import { Router } from "express";
import { OrientationController } from "../controllers/orientationController.js";
import { requestBodyValidator } from "../middlewares/json/requestBodyValidator.js"
import { orientationSchema } from "../middlewares/json/schemas/orientationSchema.js";
import * as orientationErrorHandler from "../middlewares/exceptions/orientationErrorHandler.js";
import * as answerErrorHandler from "../middlewares/exceptions/answerErrorHandler.js";


export const orientationRouter = new Router();

orientationRouter.get("/",
    OrientationController.findAll
)

orientationRouter.post("/",
    requestBodyValidator(orientationSchema),
    answerErrorHandler.exists(true),
    OrientationController.create
)

orientationRouter.get("/:id",
    orientationErrorHandler.exists(false, false),
    OrientationController.findById
)

orientationRouter.delete("/:id",
    orientationErrorHandler.exists(false, false),
    OrientationController.deleteById
)

orientationRouter.put("/:id",
    requestBodyValidator(orientationSchema),
    orientationErrorHandler.exists(false, false),
    answerErrorHandler.exists(true),
    OrientationController.update
)
