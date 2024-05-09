export const userGroupSchema = {
    title: "user type schema.",
    description: "needs only a text (group name)",
    type: "object",
    properties: {
        "text": {
            "description": "group name",
            "type": "string",
            "format": "regex",
            "pattern": "^.{1,255}$"
        }
    },
    required: ["text"]
}
