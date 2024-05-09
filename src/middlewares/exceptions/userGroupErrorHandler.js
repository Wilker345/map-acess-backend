import * as userGroupService from "../../services/userGroupService.js";


export const exists = function(isAttribute) {
    return async function (req, res, next) {
        const groupIdentifier = isAttribute === true? req.body["user_groups"] : Number(req.params["id"])
        if (isNaN(groupIdentifier) === false) {
            const userGroup = await userGroupService.findById(groupIdentifier)
            if (userGroup == null) {
                let error = new Error(`required user group with id="${groupIdentifier}" doesn't exists.`)
                error.cause = `required user group with id="${groupIdentifier}" doesn't exists.`
                error.statusCode = 404
                next(error)
            }
            res.locals.userGroup = userGroup
        }

        for (let i = 0; i < Object.keys(groupIdentifier).length; i++) {
            let userGroup = await userGroupService
                .findById(groupIdentifier[i]["id"])
            if (userGroup == null) {
                let error = new Error(`required user group "${groupIdentifier[i]["text"]}" doesn't exists.`)
                error.cause = `required user group "${groupIdentifier[i]["text"]}" doesn't exists.`
                error.statusCode = 404
                next(error)
            }
        }

        next()
    }
}
