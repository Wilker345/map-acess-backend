import * as answerService from "../../services/answerService.js";


export const exists = function(isAttribute) {
    return async function (req, res, next) {
        const id = isAttribute === true? Number(req.body["answer_id"]) : Number(req.params["id"])
        if (isNaN(id) === false) {
            const answer = await answerService.findById(id)
            if (answer == null) {
                let error = new Error("required answer doesn't exists.")
                error.cause = "required answer doesn't exists."
                error.statusCode = 404
                next(error)
            }
            res.locals.answer = answer
        }

        next()
    }
}
