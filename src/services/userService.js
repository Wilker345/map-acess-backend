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
        include: {
            user_groups: true,
        }
    });

}

export async function create(data) {
    const groupsIds = data["user_groups"];
    return prisma.user.create({
        data: {
            phone_number: data["phone_number"],
            user_groups: {
                connect: groupsIds
            },
            email: data["email"],
            password: data["password"]
        },
    })
}

export async function update(data) {
    const setValue = data["user_groups"].map( ({id, text}) => ({id}) )
    return prisma.user.update({
        where: {
            id: data["id"]
        },
        data: {
            phone_number: data["phone_number"],
            user_groups: {
                set: setValue,
            },
            email: data["email"],
            password: data["password"]
        },
    })


}

export async function deleteById(data) {
    // É necessário remover o relacionamento do usuário com seus grupos antes de efetuar o delete.
    await prisma.user.update({
        where: {
            id: data["id"],
        },
        data: {
            user_groups: {
                set: [],
            }
        },
    });

    return prisma.user.delete({
        where: {
            id: data["id"]
        },
    })
}