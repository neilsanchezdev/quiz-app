import { prisma } from '../src/lib/prisma';

async function main() {

    // Fetch all users with their posts
    const allUsers = await prisma.quiz.findMany({
        include: {
            questions: true,
        },
    })
    console.log('All quizzes:', JSON.stringify(allUsers, null, 2))
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })