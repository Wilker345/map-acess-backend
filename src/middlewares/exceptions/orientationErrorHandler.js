import * as orientationService from "../../services/orientationService.js";


export const exists = function(isAttribute) {
    return async function (req, res, next) {
        const id = isAttribute === true? Number(req.body["orientation_id"]) : Number(req.params["id"])
        if (isNaN(id) === false) {
            const orientation = await orientationService.findById(id)
            if (orientation == null) {
                let error = new Error("required orientation doesn't exists.")
                error.cause = "required orientation doesn't exists."
                error.statusCode = 404
                next(error)
            }
            res.locals.orientation = orientation
        }

        next()
    }
}
