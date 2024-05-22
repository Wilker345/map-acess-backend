import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export async function findAll(data) {
    return prisma.answer.findMany(data)
}

export async function findById(id) {
    return prisma.answer.findUnique({
        where: {
            id: id,
        },
    });

}

export async function create(data) {
    return prisma.answer.create({
        data: {
            text: data["text"],
            question: {
                connect: {id: data["question_id"]}
            },
        },
    })

}

export async function update(data) {
    return prisma.answer.update({
        where: {
            id: data["id"]
        },
        data: {
            text: data["text"],
            question: {
                connect: {id: data["question_id"]}
            },
        },
    })

}

export async function deleteById(data) {
    return prisma.answer.delete({
        where: {
            id: data["id"]
        },
    })

}
