import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getRole(email) {
    try {
        const userRole = await prisma.userRoles.findUnique({
            where: { email },
            select: { role: true }
        })
        console.log(`Fetched role for ${email}:`, userRole ? userRole.role : 'No role found')
        return userRole ? userRole.role : null
    } catch (error) {
        console.error('Error fetching user role:', error)
        throw error
    }
}


export async function createUser(email,role){
    // TODO : sql inj ?
    // Check if user already exists
    const existingUser = await prisma.userRoles.findUnique({
        where: { email }
    })

    if (existingUser) {
        console.log(`User with email ${email} already exists with role ${existingUser.role}.`)
        return existingUser
    }

    // Create new user role entry
    const newUser = await prisma.userRoles.create({
        data: {
            email,
            role
        }
    })
    console.log(`Created new user with email ${email} and role ${role}.`)
    return newUser
}
