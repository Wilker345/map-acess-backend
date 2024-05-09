import {PrismaClient} from '@prisma/client'


const prisma = new PrismaClient()

export async function findAll(data) {
    return prisma.userGroup.findMany(data)
}

export async function findById(id) {
    return prisma.userGroup.findUnique({
        where: {
            id: id,
        },
    });

}

export async function create(data) {
    return prisma.userGroup.create({
        data: {
            text: data["text"]
        },
    })

}

export async function update(data) {
    return prisma.userGroup.update({
        where: {
            id: data["id"]
        },
        data: {
            text: data["text"],
        },
    })

}

export async function deleteById(data) {
    return prisma.userGroup.delete({
        where: {
            id: data["id"]
        },
    })

}
