import * as questionService from "../../services/questionService.js";


export const exists = function(isAttribute) {
    return async function (req, res, next) {
        const id = isAttribute === true? Number(req.body["question_id"]) : Number(req.params["id"])
        if (isNaN(id) === false) {
            const question = await questionService.findById(id)
            if (question == null) {
                let error = new Error("required question doesn't exists.")
                error.cause = "required question doesn't exists."
                error.statusCode = 404
                next(error)
            }
            res.locals.question = question
        }

        next()
    }
}
