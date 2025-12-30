import { prisma } from "../src/lib/prisma"

const quizData = [
    {
        id: "cultura-general",
        title: "Cultura General",
        description: "Pon a prueba tus conocimientos generales sobre diversos temas.",
        difficulty: "medium",
        totalQuestions: 5,
        estimatedTime: "5 min",
        questions: [
            {
                question: "¿Cuál es la capital de Francia?",
                options: [
                    { id: "1", text: "Londres" },
                    { id: "2", text: "París" },
                    { id: "3", text: "Berlín" },
                    { id: "4", text: "Madrid" },
                ],
                correctAnswer: 2,
                timeLimit: 30,
                points: 100,
                order: 1,
            },
            {
                question: "¿En qué año llegó el hombre a la Luna?",
                options: [
                    { id: "1", text: "1965" },
                    { id: "2", text: "1969" },
                    { id: "3", text: "1972" },
                    { id: "4", text: "1975" },
                ],
                correctAnswer: 2,
                timeLimit: 30,
                points: 100,
                order: 2,
            },
            {
                question: "¿Quién pintó la Mona Lisa?",
                options: [
                    { id: "1", text: "Vincent van Gogh" },
                    { id: "2", text: "Pablo Picasso" },
                    { id: "3", text: "Leonardo da Vinci" },
                    { id: "4", text: "Michelangelo" },
                ],
                correctAnswer: 3,
                timeLimit: 30,
                points: 100,
                order: 3,
            },
            {
                question: "¿Cuál es el océano más grande del mundo?",
                options: [
                    { id: "1", text: "Atlántico" },
                    { id: "2", text: "Índico" },
                    { id: "3", text: "Ártico" },
                    { id: "4", text: "Pacífico" },
                ],
                correctAnswer: 4,
                timeLimit: 30,
                points: 100,
                order: 4,
            },
            {
                question: "¿Cuántos continentes hay en la Tierra?",
                options: [
                    { id: "1", text: "5" },
                    { id: "2", text: "6" },
                    { id: "3", text: "7" },
                    { id: "4", text: "8" },
                ],
                correctAnswer: 3,
                timeLimit: 30,
                points: 100,
                order: 5,
            },
        ],
    },
    {
        id: "ciencias",
        title: "Ciencias",
        description: "Desafía tus conocimientos científicos con estas preguntas.",
        difficulty: "hard",
        totalQuestions: 5,
        estimatedTime: "7 min",
        questions: [
            {
                question: "¿Cuál es el elemento químico con símbolo Au?",
                options: [
                    { id: "1", text: "Plata" },
                    { id: "2", text: "Oro" },
                    { id: "3", text: "Aluminio" },
                    { id: "4", text: "Cobre" },
                ],
                correctAnswer: 2,
                timeLimit: 45,
                points: 150,
                order: 1,
            },
            {
                question: "¿Cuál es la velocidad de la luz en el vacío?",
                options: [
                    { id: "1", text: "300,000 km/s" },
                    { id: "2", text: "150,000 km/s" },
                    { id: "3", text: "450,000 km/s" },
                    { id: "4", text: "600,000 km/s" },
                ],
                correctAnswer: 1,
                timeLimit: 45,
                points: 150,
                order: 2,
            },
            {
                question: "¿Qué planeta es conocido como el planeta rojo?",
                options: [
                    { id: "1", text: "Venus" },
                    { id: "2", text: "Júpiter" },
                    { id: "3", text: "Marte" },
                    { id: "4", text: "Saturno" },
                ],
                correctAnswer: 3,
                timeLimit: 30,
                points: 150,
                order: 3,
            },
            {
                question: "¿Cuántos huesos tiene el cuerpo humano adulto?",
                options: [
                    { id: "1", text: "186" },
                    { id: "2", text: "206" },
                    { id: "3", text: "226" },
                    { id: "4", text: "246" },
                ],
                correctAnswer: 2,
                timeLimit: 45,
                points: 150,
                order: 4,
            },
            {
                question: "¿Qué gas es el más abundante en la atmósfera terrestre?",
                options: [
                    { id: "1", text: "Oxígeno" },
                    { id: "2", text: "Nitrógeno" },
                    { id: "3", text: "Dióxido de carbono" },
                    { id: "4", text: "Hidrógeno" },
                ],
                correctAnswer: 2,
                timeLimit: 40,
                points: 150,
                order: 5,
            },
        ],
    },
    {
        id: "historia",
        title: "Historia Mundial",
        description: "Viaja a través del tiempo con estas preguntas históricas.",
        difficulty: "medium",
        totalQuestions: 5,
        estimatedTime: "6 min",
        questions: [
            {
                question: "¿En qué año comenzó la Primera Guerra Mundial?",
                options: [
                    { id: "1", text: "1912" },
                    { id: "2", text: "1914" },
                    { id: "3", text: "1916" },
                    { id: "4", text: "1918" },
                ],
                correctAnswer: 2,
                timeLimit: 35,
                points: 120,
                order: 1,
            },
            {
                question: "¿Quién fue el primer presidente de Estados Unidos?",
                options: [
                    { id: "1", text: "Thomas Jefferson" },
                    { id: "2", text: "Benjamin Franklin" },
                    { id: "3", text: "George Washington" },
                    { id: "4", text: "John Adams" },
                ],
                correctAnswer: 3,
                timeLimit: 30,
                points: 120,
                order: 2,
            },
            {
                question: "¿En qué año cayó el Muro de Berlín?",
                options: [
                    { id: "1", text: "1987" },
                    { id: "2", text: "1989" },
                    { id: "3", text: "1991" },
                    { id: "4", text: "1993" },
                ],
                correctAnswer: 2,
                timeLimit: 35,
                points: 120,
                order: 3,
            },
            {
                question: "¿Quién descubrió América en 1492?",
                options: [
                    { id: "1", text: "Hernán Cortés" },
                    { id: "2", text: "Cristóbal Colón" },
                    { id: "3", text: "Américo Vespucio" },
                    { id: "4", text: "Fernando de Magallanes" },
                ],
                correctAnswer: 2,
                timeLimit: 30,
                points: 120,
                order: 4,
            },
            {
                question: "¿Cuál fue la civilización que construyó Machu Picchu?",
                options: [
                    { id: "1", text: "Aztecas" },
                    { id: "2", text: "Mayas" },
                    { id: "3", text: "Incas" },
                    { id: "4", text: "Olmecas" },
                ],
                correctAnswer: 3,
                timeLimit: 35,
                points: 120,
                order: 5,
            },
        ],
    },
]

async function main() {
    console.log("Limpiando base de datos...")
    await prisma.userAnswer.deleteMany()
    await prisma.quizSession.deleteMany()
    await prisma.question.deleteMany()
    await prisma.quiz.deleteMany()

    console.log("Poblando base de datos con quizzes...")

    for (const quiz of quizData) {
        const { questions, ...quizInfo } = quiz

        await prisma.quiz.create({
            data: {
                ...quizInfo,
                questions: {
                    create: questions.map((q) => ({
                        ...q,
                        options: JSON.stringify(q.options),
                    })),
                },
            },
        })

        console.log(`✓ Quiz "${quiz.title}" creado con ${questions.length} preguntas`)
    }

    console.log("Base de datos poblada exitosamente!")
}

main()
    .catch((e) => {
        console.error("Error poblando la base de datos:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
