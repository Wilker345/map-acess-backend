import { Router } from "express";
import { UserTypeController } from "../controllers/userTypeController.js";
import { requestBodyValidator } from "../middlewares/json/requestBodyValidator.js"
import { userTypeSchema } from "../middlewares/json/schemas/userTypeSchema.js";
import * as userTypeErrorHandler from "../middlewares/exceptions/userTypeErrorHandler.js";
export const userTypeRouter = new Router();

userTypeRouter.get("/",
    UserTypeController.findAll
)

userTypeRouter.post("/",
    requestBodyValidator(userTypeSchema),
    UserTypeController.create
)

userTypeRouter.get("/:id",
    userTypeErrorHandler.exists(false),
    UserTypeController.findById
)

userTypeRouter.delete("/:id",
    userTypeErrorHandler.exists(false),
    UserTypeController.deleteById
)

userTypeRouter.put("/:id",
    userTypeErrorHandler.exists(false),
    requestBodyValidator(userTypeSchema),
    UserTypeController.update
)
