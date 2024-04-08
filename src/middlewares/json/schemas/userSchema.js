export const post = {
    title: "post user schema.",
    description: "Needs every attribute. Phone-number and email have regexes",
    type: "object",
    properties: {
        "phone_number": {
            "description": "User's phone-number. Does have a regex.",
            "type": "string",
            "format": "regex",
            "pattern": "^(?:\\([1-9]{2}\\)|[1-9]{2})[-.\\s]?9?[6-9]\\d{3}[-.\\s]?\\d{4}$"
        },
        "user_type_id": {
            "description": "User's type foreign key.",
            "type": "integer"
        },
        "email": {
            "description": "User's email. Does have a regex.",
            "type": "string",
            "format": "email"
        },
        "password": {
            "description": "User's password. Does have a regex.",
            "type": "string",
            "format": "regex",
            "pattern": "^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])[\\da-zA-Z].{7,254}$"
        }
    },
    required: ["phone_number", "user_type_id", "email", "password"]
}

export const put = {
    title: "Put user schema.",
    description: "Don't need every attribute. Phone-number, password and email have regexes",
    type: "object",
    properties: {
        "phone_number": {
            "description": "User's phone-number. Does have a regex.",
            "type": "string",
            "format": "regex",
            "pattern": "^(?:\\([1-9]{2}\\)|[1-9]{2})[-.\\s]?9?[6-9]\\d{3}[-.\\s]?\\d{4}$"
        },
        "user_type_id": {
            "description": "User's type foreign key.",
            "type": "integer"
        },
        "email": {
            "description": "User's email. Does have a regex.",
            "type": "string",
            "format": "email"
        },
        "password": {
            "description": "User's password. Does have a regex.",
            "type": "string",
            "format": "regex",
            "pattern": "^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])[\\da-zA-Z].{7,254}$"
        }
    }
}
