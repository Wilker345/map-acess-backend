import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export async function findAll(data) {
    return prisma.orientation.findMany(data)
}

export async function findById(id) {
    return prisma.orientation.findUnique({
        where: {
            id: id,
        },
    });

}

export async function create(data) {
    return prisma.orientation.create({
        data: {
            text: data["text"],
            value: data["value"],
            answer: {
                connect: {id: data["answer_id"]}
            },
        },
    })

}

export async function update(data) {
    return prisma.orientation.update({
        where: {
            id: data["id"]
        },
        data: {
            text: data["text"],
            value: data["value"],
            answer: {
                connect: {id: data["answer_id"]}
            },
        },
    })

}

export async function deleteById(data) {
    return prisma.orientation.delete({
        where: {
            id: data["id"]
        },
    })

}
