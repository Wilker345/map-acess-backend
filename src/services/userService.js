import {PrismaClient} from '@prisma/client'


const prisma = new PrismaClient()

export async function findAll(data) {
    return prisma.user.findMany(data)
}

export async function findById(id) {
    return prisma.user.findUnique({
        where: {
            id: id,
        },
    });

}

export async function create(data) {
    return prisma.user.create({
        data: {
            phone_number: data["phone_number"],
            user_type: {
                connect: {id: data["user_type_id"]}
            },
            email: data["email"],
            password: data["password"]
        },
    })

}

export async function update(data) {
    return prisma.user.update({
        where: {
            id: data["id"]
        },
        data: {
            phone_number: data["phone_number"],
            user_type: {
                connect: {id: data["user_type_id"]}
            },
            email: data["email"],
            password: data["password"]
        },
    })

}

export async function deleteById(data) {
    return prisma.user.delete({
        where: {
            id: data["id"]
        },
    })
}