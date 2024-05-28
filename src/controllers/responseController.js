import * as responseService from "../services/responseService.js"
import * as orientationService from "../services/orientationService.js"
import * as answerService from "../services/answerService.js"
import * as questionService from "../services/questionService.js"
import * as userGroupService from "../services/userGroupService.js"
import {config} from "../../config.js"

// objeto de response está sendo chamado de responeReport devido ao express usar o nome response
export class ResponseController {
    static async findAll(req, res) {
        const queryParam = req.query

        let filter = {}

        const orientationId = queryParam["orientation-id"]
        if (isNaN(orientationId) === false) {
            filter["orientation_id"] = Number(queryParam["orientation-id"])
        }

        const query = {
            skip: queryParam["pg"] == null ? 0 : (Number(queryParam["qt"]) * (Number(queryParam["pg"]) - 1)),
            take: queryParam["qt"] == null ? 100 : Number(queryParam["qt"]),
            where: filter,
            include: {
                orientations: true
            }
        }

        res.send(await responseService.findAll(query));

    }
    static async create(req, res, next) {
        try {
            const answers = req.body["answers"]
            let orientations = []
            for (let i = 0; i < answers.length; i++) {
                if (answers[i]["other"] === true) {
                    let currentAnswer = req.body["other_answers"][`content_${answers[i]["id"]}`]
                    let newOrientation =
                        await orientationService.create({
                        "text": currentAnswer["text"],
                        "value": 0,
                        "answer_id": answers[i]["id"]
                    })
                    orientations.push({"id": newOrientation["id"]})
                }
                if(answers[i]["other"] === false) {
                    let orientation = await orientationService.findByAnswer(answers[i]["id"])
                    orientations.push({"id": orientation["id"]})
                }
            }
            const data = {
                "user_id": req.body["user_id"],
                "orientations": orientations
            }
            const responseReport = await responseService.create(data)
            res.status(201).send(responseReport);
        } catch (err) {
            let serviceError = new Error(err.message);
            serviceError.cause = err.meta
            serviceError.statusCode = 400
            next(serviceError)
        }
    }

    static async findById(req, res) {
        const responseReport = res.locals.responseReport
        res.send(responseReport);
    }

    static deleteById(req, res) {
        responseService.deleteById(res.locals.responseReport).then(res.sendStatus(204))
    }

    static async update(req, res, next) {
        const answers = req.body["answers"]
        let orientations = []
        for (let i = 0; i < answers.length; i++) {
            if (answers[i]["other"] === true) {
                let currentAnswer = req.body["other_answers"][`content_${answers[i]["id"]}`]
                let otherOrientation =
                    await orientationService.findByAnswer(answers[i]["id"])
                // Verificar se o texto na "Outra resposta" foi modificado, para criar ou não uma nova orientação
                if (currentAnswer["text"] !== otherOrientation["text"]) {
                    let newOrientation =
                        await orientationService.create({
                            "text": currentAnswer["text"],
                            "value": 0,
                            "answer_id": answers[i]["id"]
                        })
                    orientations.push({"id": newOrientation["id"]})
                    await orientationService.deleteById({"id": Number(otherOrientation["id"])})
                }
                if (currentAnswer["text"] === otherOrientation["text"]) {
                    orientations.push({"id": otherOrientation["id"]})
                }
            }
            if(answers[i]["other"] === false) {
                let orientation = await orientationService.findByAnswer(answers[i]["id"])
                orientations.push({"id": orientation["id"]})
            }
        }
        const data = {
            "id": res.locals.responseReport["id"],
            "user_id": req.body["user_id"],
            "orientations": orientations
        }

        try {
            const responseReport = await responseService.update(data)
            res.send(responseReport)
        } catch (err) {
            let serviceError = new Error(err.message);
            serviceError.cause = err.meta
            serviceError.statusCode = 400
            next(serviceError)
        }

    }
    static async sendReport(req, res) {
        const responseReport = res.locals.responseReport
        let jsonData = {
            id: responseReport["id"],
            timestamp: responseReport["timestamp"],
            orientations:{}
        }
        for (let i = 0; i < responseReport.orientations.length; i++) {
            let currentAnswer =
                await answerService.findById(responseReport.orientations[i].answer_id)
            let currentQuestion =
                await questionService.findById(currentAnswer["question_id"])
            let currentGroup =
                await userGroupService.findById(currentQuestion["user_group_id"])

            if (!(currentGroup["text"] in jsonData.orientations)) {
                jsonData.orientations[`${currentGroup["text"]}`] = {
                    "questions":[],
                    "value": 0,
                }
            }

            jsonData.orientations[`${currentGroup["text"]}`]["questions"].push({
                "text": currentQuestion["text"],
                "answer": currentAnswer["text"],
                "orientation": responseReport.orientations[i].text
            })
            jsonData.orientations[`${currentGroup["text"]}`]["value"] += responseReport.orientations[i]["value"]
        }

        res.render('index', { jsonData: jsonData, config: config })
    }


}