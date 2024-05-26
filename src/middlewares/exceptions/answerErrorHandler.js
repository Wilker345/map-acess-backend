import * as answerService from "../../services/answerService.js";


export const exists = function(isAttribute, isManyToMany) {
    return async function (req, res, next) {
        const bodyHashKey = isManyToMany === true ? req.body["answers"] : req.body["answer_id"];
        const answerIdentifier = isAttribute === true? bodyHashKey : Number(req.params["id"])

        if (isNaN(answerIdentifier) === false) {
            const answer = await answerService.findById(answerIdentifier)
            if (answer == null) {
                let error = new Error(`required answer with id="${answerIdentifier}" doesn't exists.`)
                error.cause = `required answer with id="${answerIdentifier}" doesn't exists.`
                error.statusCode = 404
                next(error)
            }
            res.locals.answer = answer
        }

        for (let i = 0; i < Object.keys(answerIdentifier).length; i++) {
            let answer = await answerService
                .findById(answerIdentifier[i]["id"])
            if (answer == null) {
                let error = new Error(`required answer "${answerIdentifier[i]["text"]}" doesn't exists.`)
                error.cause = `required answer "${answerIdentifier[i]["text"]}" doesn't exists.`
                error.statusCode = 404
                next(error)
            }
        }

        next()
    }
}
