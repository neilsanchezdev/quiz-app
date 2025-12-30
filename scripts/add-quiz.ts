import { prisma } from "../src/lib/prisma"

const quizData = [
    {
        id: "backend-php",
        title: "Desarrollo Backend en PHP",
        description: "Evalúa tus conocimientos sobre backend con PHP y buenas prácticas.",
        difficulty: "hard",
        totalQuestions: 8,
        estimatedTime: "10 min",
        questions: [
            {
                question: "¿Qué versión de PHP introdujo el tipado escalar y de retorno?",
                options: [
                    { id: "opt1", text: "PHP 5.6" },
                    { id: "opt2", text: "PHP 7.0" },
                    { id: "opt3", text: "PHP 7.4" },
                    { id: "opt4", text: "PHP 8.0" },
                ],
                correctAnswer: 1,
                timeLimit: 40,
                points: 120,
                order: 1,
            },
            {
                question: "¿Qué patrón de arquitectura utiliza Laravel principalmente para su estructura?",
                options: [
                    { id: "opt1", text: "MVC (Model View Controller)" },
                    { id: "opt2", text: "MVVM (Model View ViewModel)" },
                    { id: "opt3", text: "CQRS" },
                    { id: "opt4", text: "Hexagonal Architecture" },
                ],
                correctAnswer: 0,
                timeLimit: 30,
                points: 120,
                order: 2,
            },
            {
                question: "¿Qué interfaz define el contrato para contenedores de inversión de dependencias en PHP?",
                options: [
                    { id: "opt1", text: "Psr\\Log\\LoggerInterface" },
                    { id: "opt2", text: "Psr\\Container\\ContainerInterface" },
                    { id: "opt3", text: "Psr\\Http\\Message\\ServerRequestInterface" },
                    { id: "opt4", text: "Psr\\Cache\\CacheItemPoolInterface" },
                ],
                correctAnswer: 1,
                timeLimit: 45,
                points: 140,
                order: 3,
            },
            {
                question: "¿Cuál es la función correcta para prevenir inyección SQL al interactuar con PDO?",
                options: [
                    { id: "opt1", text: "PDO::query()" },
                    { id: "opt2", text: "PDO::prepare() + bindValue()" },
                    { id: "opt3", text: "PDO::exec()" },
                    { id: "opt4", text: "PDO::fetch()" },
                ],
                correctAnswer: 1,
                timeLimit: 35,
                points: 140,
                order: 4,
            },
            {
                question: "¿Qué característica de PHP 8 permite ejecutar validaciones sobre parámetros en tiempo de construcción del objeto?",
                options: [
                    { id: "opt1", text: "Attributes" },
                    { id: "opt2", text: "Named Arguments" },
                    { id: "opt3", text: "Constructor Property Promotion" },
                    { id: "opt4", text: "JIT Compiler" },
                ],
                correctAnswer: 0,
                timeLimit: 40,
                points: 140,
                order: 5,
            },
            {
                question: "¿Cuál de los siguientes códigos HTTP es apropiado para una validación fallida en una API REST hecha en PHP?",
                options: [
                    { id: "opt1", text: "200 OK" },
                    { id: "opt2", text: "401 Unauthorized" },
                    { id: "opt3", text: "422 Unprocessable Entity" },
                    { id: "opt4", text: "500 Internal Server Error" },
                ],
                correctAnswer: 2,
                timeLimit: 25,
                points: 110,
                order: 6,
            },
            {
                question: "En términos de performance en PHP-FPM, ¿qué opción es más eficiente para compartir conexiones de base de datos entre requests?",
                options: [
                    { id: "opt1", text: "Una conexión global estática por script" },
                    { id: "opt2", text: "Conexiones persistentes (pconnect)" },
                    { id: "opt3", text: "Abrir y cerrar conexiones en cada request" },
                    { id: "opt4", text: "Usar WebSockets para DB" },
                ],
                correctAnswer: 1,
                timeLimit: 40,
                points: 150,
                order: 7,
            },
            {
                question: "¿Qué vulnerabilidad se mitiga correctamente usando `hash_equals()` en PHP?",
                options: [
                    { id: "opt1", text: "SQL Injection" },
                    { id: "opt2", text: "Timing attack" },
                    { id: "opt3", text: "XSS" },
                    { id: "opt4", text: "CSRF" },
                ],
                correctAnswer: 1,
                timeLimit: 35,
                points: 150,
                order: 8,
            },
        ],
    },
]


async function main() {
    console.log("Agregando nuevos quizzes...")

    for (const quiz of quizData) {
        const { questions, ...quizInfo } = quiz

        // 1) Crea el quiz si no existe
        const createdQuiz = await prisma.quiz.upsert({
            where: { id: quiz.id },
            update: {}, // <- puedes actualizar campos del quiz aquí si quieres
            create: {
                ...quizInfo,
            },
        })

        console.log(`Quiz "${quiz.title}" asegurado en DB`)

        // 2) Crea preguntas si no existen
        for (const q of questions) {
            const existingQuestion = await prisma.question.findFirst({
                where: {
                    quizId: createdQuiz.id,
                    order: q.order,
                },
            })

            if (!existingQuestion) {
                await prisma.question.create({
                    data: {
                        ...q,
                        quizId: createdQuiz.id,
                        options: JSON.stringify(q.options),
                    },
                })

                console.log(`  ✓ Pregunta #${q.order} creada`)
            } else {
                console.log(`  ↺ Pregunta #${q.order} ya existía, no se modifica`)
                // Si quieres actualizar preguntas existentes:
                // await prisma.question.update({
                //   where: { id: existingQuestion.id },
                //   data: {
                //     question: q.question,
                //     options: JSON.stringify(q.options),
                //     correctAnswer: q.correctAnswer,
                //     timeLimit: q.timeLimit,
                //     points: q.points,
                //   },
                // })
            }
        }
    }

    console.log("✔ Proceso completado sin borrar información previa")
}

main()
    .catch((e) => {
        console.error("Error agregando quizzes:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
