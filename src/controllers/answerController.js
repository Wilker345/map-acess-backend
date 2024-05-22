import * as answerService from "../services/answerService.js"


export class AnswerController {
    static async findAll(req, res) {
        const queryParam = req.query

        let filter = {
            text: {
                startsWith: queryParam["text"]
            }
        }

        const questionId = queryParam["question-id"]
        if (isNaN(questionId) === false) {
            filter["question_id"] = Number(queryParam["question-id"])
        }

        const query = {
            skip: queryParam["pg"] == null? 0 : ( Number(queryParam["qt"]) * (Number(queryParam["pg"]) - 1) ),
            take: queryParam["qt"] == null? 100 : Number(queryParam["qt"]),
            where: filter
        }
        res.send(await answerService.findAll(query));

    }

    static async create(req, res, next) {
        try {
            const answer = await answerService.create(req.body)
            res.status(201).send(answer)
        } catch(err) {
            let serviceError = new Error(err.message);
            serviceError.cause = err.meta
            serviceError.statusCode = 400
            next(serviceError)
        }
    }

    static findById(req, res) {
        res.send(res.locals.answer);
    }

    static deleteById(req, res) {
        answerService.deleteById(res.locals.answer).then(res.sendStatus(204))
    }

    static async update(req, res, next) {
        const data = {
            "id": res.locals.answer["id"],
            "text": req.body["text"],
            "question_id": req.body["question_id"]
        }
        try {
            const answer = await answerService.update(data)
            res.send(answer)
        } catch(err) {
            let serviceError = new Error(err.message);
            serviceError.cause = err.meta
            serviceError.statusCode = 400
            next(serviceError)
        }
    }

}
