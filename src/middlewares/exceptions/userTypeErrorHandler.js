import * as userTypeService from "../../services/userTypeService.js";


export const exists = function(isAttribute) {
    return async function (req, res, next) {
        const id = isAttribute === true? Number(req.body["user_type_id"]) : Number(req.params["id"])
        if (isNaN(id) === false) {
            const userType = await userTypeService.findById(id)
            if (userType == null) {
                let error = new Error("required user type doesn't exists.")
                error.cause = "required user type doesn't exists."
                error.statusCode = 404
                next(error)
            }
            res.locals.userType = userType
        }

        next()
    }
}
