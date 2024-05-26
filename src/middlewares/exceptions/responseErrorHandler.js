import * as responseService from "../../services/responseService.js";


export const exists = function(isAttribute) {
    return async function (req, res, next) {
        const id = isAttribute === true? Number(req.body["response_id"]) : Number(req.params["id"])
        if (isNaN(id) === false) {
            const response = await responseService.findById(id)
            if (response == null) {
                let error = new Error("required response doesn't exists.")
                error.cause = "required response doesn't exists."
                error.statusCode = 404
                next(error)
            }
            res.locals.responseReport = response
        }

        next()
    }
}