import { Router } from "express";
import { UserController } from "../controllers/userController.js";
import { requestBodyValidator } from "../middlewares/json/requestBodyValidator.js"
import * as userSchema  from "../middlewares/json/schemas/userSchema.js";
import * as userErrorHandler from "../middlewares/exceptions/userErrorHandler.js";
import * as userGroupErrorHandler from "../middlewares/exceptions/userGroupErrorHandler.js";


export const userRouter = new Router();

userRouter.get("/",
    UserController.findAll
)

userRouter.post("/",
    requestBodyValidator(userSchema.post),
    userGroupErrorHandler.exists(true),
    UserController.create
)

userRouter.get("/:id",
    userErrorHandler.exists(false),
    UserController.findById
)

userRouter.delete("/:id",
    userErrorHandler.exists(false),
    UserController.deleteById
)

userRouter.put("/:id",
    userErrorHandler.exists(false),
    requestBodyValidator(userSchema.put),
    userGroupErrorHandler.exists(true),
    UserController.update
)
