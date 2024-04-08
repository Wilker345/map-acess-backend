import * as userTypeService from "../services/userTypeService.js"


export class UserTypeController {
    static async findAll(req, res) {
        const queryParam = req.query
        const data = {
            "description": queryParam["description"],
            "skip": queryParam["pg"] == null? 0 : ( Number(queryParam["qt"]) * (Number(queryParam["pg"]) - 1) ),
            "take": queryParam["qt"] == null? 100 : Number(queryParam["qt"])
        }
        res.send(await userTypeService.findAll(data));

    }
    static async create(req, res, next) {
        try {
            const userType = await userTypeService.create(req.body)
            res.status(201).send(userType)
        } catch(err) {
            let serviceError = new Error(err.message);
            serviceError.cause = err.meta
            serviceError.statusCode = 400
            next(serviceError)
        }
    }

    static findById(req, res) {
        res.send(res.locals.userType);
    }

    static deleteById(req, res) {
        userTypeService.deleteById(res.locals.userType).then(res.sendStatus(204))
    }

    static async update(req, res, next) {
        const data = {
            "id": res.locals.userType["id"],
            "description": req.body["description"]
        }
        try {
            const userType = await userTypeService.update(data)
            res.send(userType)
        } catch(err) {
            let serviceError = new Error(err.message);
            serviceError.cause = err.meta
            serviceError.statusCode = 400
            next(serviceError)
        }
    }

}
