import {PrismaClient} from '@prisma/client'


const prisma = new PrismaClient()

export async function findAll(data) {
    return prisma.userType.findMany({
        skip: data["skip"],
        take: data["take"],
        where: {
            description: {
                startsWith: data["description"]
            },
        },
    })

}

export async function findById(id) {
    return prisma.userType.findUnique({
        where: {
            id: id,
        },
    });

}

export async function create(data) {
    return prisma.userType.create({
        data: {
            description: data["description"]
        },
    })

}

export async function update(data) {
    return prisma.userType.update({
        where: {
            id: data["id"]
        },
        data: {
            description: data["description"],
        },
    })

}

export async function deleteById(data) {
    return prisma.userType.delete({
        where: {
            id: data["id"]
        },
    })

}
