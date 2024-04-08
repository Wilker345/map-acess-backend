import Ajv from "ajv"
import addFormats from "ajv-formats"
const ajv = new Ajv();
addFormats(ajv)

export const requestBodyValidator = function(schema) {
    const validate = ajv.compile(schema)
    return function(req, res, next) {
        const data = req.body
        
        const valid = validate(data)

        if (!valid) {
            const resBody = validate.errors[0]

            let error = new Error(resBody["message"])
            error.cause = resBody["instancePath"]
            error.statusCode = 400
 
            next(error)
        }
        next()
    }
}