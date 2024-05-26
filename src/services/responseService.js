import {PrismaClient} from '@prisma/client'


const prisma = new PrismaClient()

export async function findAll(data) {
    return prisma.response.findMany(data)
}

export async function findById(id) {
    return prisma.response.findUnique({
        where: {
            id: id,
        },
        include: {
            orientations: true
        }
    });

}

export async function create(data) {
    const orientationsIds = data["orientations"];

    return prisma.response.create({
        data: {
            timestamp: new Date(),
            orientations: {
                connect: orientationsIds
            },
            user_id: data["user_id"]
        },
    })
}

export async function update(data) {
    const setValue = data["orientations"].map( ({id, text}) => ({id}) )

    return prisma.response.update({
        where: {
            id: data["id"]
        },
        data: {
            timestamp: new Date(),
            orientations: {
                set: setValue,
            },
            user_id: data["user_id"]
        },
    })


}

export async function deleteById(data) {
    // É necessário remover o relacionamento da response com suas orientations antes de efetuar o delete.
    await prisma.response.update({
        where: {
            id: data["id"],
        },
        data: {
            orientations: {
                set: [],
            }
        },
    });

    return prisma.response.delete({
        where: {
            id: data["id"]
        },
    })
}