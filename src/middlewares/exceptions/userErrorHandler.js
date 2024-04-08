import * as userService from "../../services/userService.js";


export const exists = function(isAttribute) {
    return async function (req, res, next) {
        const id = isAttribute === true? Number(req.body["user_id"]) : Number(req.params["id"])
        if (isNaN(id) === false) {
            const user = await userService.findById(id)
            if (user == null) {
                let error = new Error("required user doesn't exists.")
                error.cause = "required user doesn't exist."
                error.statusCode = 404
                next(error)
            }
            res.locals.user = user
        }

        next()
    }
}
