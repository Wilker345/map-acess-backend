import { Router } from "express";
import { UserGroupController } from "../controllers/userGroupController.js";
import { requestBodyValidator } from "../middlewares/json/requestBodyValidator.js"
import { userGroupSchema } from "../middlewares/json/schemas/userGroupSchema.js";
import * as userGroupErrorHandler from "../middlewares/exceptions/userGroupErrorHandler.js";
export const userGroupRouter = new Router();

userGroupRouter.get("/",
    UserGroupController.findAll
)

userGroupRouter.post("/",
    requestBodyValidator(userGroupSchema),
    UserGroupController.create
)

userGroupRouter.get("/:id",
    userGroupErrorHandler.exists(false),
    UserGroupController.findById
)

userGroupRouter.delete("/:id",
    userGroupErrorHandler.exists(false),
    UserGroupController.deleteById
)

userGroupRouter.put("/:id",
    userGroupErrorHandler.exists(false),
    requestBodyValidator(userGroupSchema),
    UserGroupController.update
)
