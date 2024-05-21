import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export async function findAll(data) {
    return prisma.question.findMany(data)
}

export async function findById(id) {
    return prisma.question.findUnique({
        where: {
            id: id,
        },
    });

}

export async function create(data) {
    return prisma.question.create({
        data: {
            text: data["text"],
            user_group: {
                connect: {id: data["user_group_id"]}
            },
        },
    })

}

export async function update(data) {
    return prisma.question.update({
        where: {
            id: data["id"]
        },
        data: {
            text: data["text"],
            user_group: {
                connect: {id: data["user_group_id"]}
            },
        },
    })

}

export async function deleteById(data) {
    return prisma.question.delete({
        where: {
            id: data["id"]
        },
    })

}
