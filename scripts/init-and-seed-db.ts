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
                    { id: "opt1", text: "Londres" },
                    { id: "opt2", text: "París" },
                    { id: "opt3", text: "Berlín" },
                    { id: "opt4", text: "Madrid" },
                ],
                correctAnswer: 1,
                timeLimit: 30,
                points: 100,
                order: 1,
            },
            {
                question: "¿En qué año llegó el hombre a la Luna?",
                options: [
                    { id: "opt1", text: "1965" },
                    { id: "opt2", text: "1969" },
                    { id: "opt3", text: "1972" },
                    { id: "opt4", text: "1975" },
                ],
                correctAnswer: 1,
                timeLimit: 30,
                points: 100,
                order: 2,
            },
            {
                question: "¿Quién pintó la Mona Lisa?",
                options: [
                    { id: "opt1", text: "Vincent van Gogh" },
                    { id: "opt2", text: "Pablo Picasso" },
                    { id: "opt3", text: "Leonardo da Vinci" },
                    { id: "opt4", text: "Michelangelo" },
                ],
                correctAnswer: 2,
                timeLimit: 30,
                points: 100,
                order: 3,
            },
            {
                question: "¿Cuál es el océano más grande del mundo?",
                options: [
                    { id: "opt1", text: "Atlántico" },
                    { id: "opt2", text: "Índico" },
                    { id: "opt3", text: "Ártico" },
                    { id: "opt4", text: "Pacífico" },
                ],
                correctAnswer: 3,
                timeLimit: 30,
                points: 100,
                order: 4,
            },
            {
                question: "¿Cuántos continentes hay en la Tierra?",
                options: [
                    { id: "opt1", text: "5" },
                    { id: "opt2", text: "6" },
                    { id: "opt3", text: "7" },
                    { id: "opt4", text: "8" },
                ],
                correctAnswer: 2,
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
                    { id: "opt1", text: "Plata" },
                    { id: "opt2", text: "Oro" },
                    { id: "opt3", text: "Aluminio" },
                    { id: "opt4", text: "Cobre" },
                ],
                correctAnswer: 1,
                timeLimit: 45,
                points: 150,
                order: 1,
            },
            {
                question: "¿Cuál es la velocidad de la luz en el vacío?",
                options: [
                    { id: "opt1", text: "300,000 km/s" },
                    { id: "opt2", text: "150,000 km/s" },
                    { id: "opt3", text: "450,000 km/s" },
                    { id: "opt4", text: "600,000 km/s" },
                ],
                correctAnswer: 0,
                timeLimit: 45,
                points: 150,
                order: 2,
            },
            {
                question: "¿Qué planeta es conocido como el planeta rojo?",
                options: [
                    { id: "opt1", text: "Venus" },
                    { id: "opt2", text: "Júpiter" },
                    { id: "opt3", text: "Marte" },
                    { id: "opt4", text: "Saturno" },
                ],
                correctAnswer: 2,
                timeLimit: 30,
                points: 150,
                order: 3,
            },
            {
                question: "¿Cuántos huesos tiene el cuerpo humano adulto?",
                options: [
                    { id: "opt1", text: "186" },
                    { id: "opt2", text: "206" },
                    { id: "opt3", text: "226" },
                    { id: "opt4", text: "246" },
                ],
                correctAnswer: 1,
                timeLimit: 45,
                points: 150,
                order: 4,
            },
            {
                question: "¿Qué gas es el más abundante en la atmósfera terrestre?",
                options: [
                    { id: "opt1", text: "Oxígeno" },
                    { id: "opt2", text: "Nitrógeno" },
                    { id: "opt3", text: "Dióxido de carbono" },
                    { id: "opt4", text: "Hidrógeno" },
                ],
                correctAnswer: 1,
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
                    { id: "opt1", text: "1912" },
                    { id: "opt2", text: "1914" },
                    { id: "opt3", text: "1916" },
                    { id: "opt4", text: "1918" },
                ],
                correctAnswer: 1,
                timeLimit: 35,
                points: 120,
                order: 1,
            },
            {
                question: "¿Quién fue el primer presidente de Estados Unidos?",
                options: [
                    { id: "opt1", text: "Thomas Jefferson" },
                    { id: "opt2", text: "Benjamin Franklin" },
                    { id: "opt3", text: "George Washington" },
                    { id: "opt4", text: "John Adams" },
                ],
                correctAnswer: 2,
                timeLimit: 30,
                points: 120,
                order: 2,
            },
            {
                question: "¿En qué año cayó el Muro de Berlín?",
                options: [
                    { id: "opt1", text: "1987" },
                    { id: "opt2", text: "1989" },
                    { id: "opt3", text: "1991" },
                    { id: "opt4", text: "1993" },
                ],
                correctAnswer: 1,
                timeLimit: 35,
                points: 120,
                order: 3,
            },
            {
                question: "¿Quién descubrió América en 1492?",
                options: [
                    { id: "opt1", text: "Hernán Cortés" },
                    { id: "opt2", text: "Cristóbal Colón" },
                    { id: "opt3", text: "Américo Vespucio" },
                    { id: "opt4", text: "Fernando de Magallanes" },
                ],
                correctAnswer: 1,
                timeLimit: 30,
                points: 120,
                order: 4,
            },
            {
                question: "¿Cuál fue la civilización que construyó Machu Picchu?",
                options: [
                    { id: "opt1", text: "Aztecas" },
                    { id: "opt2", text: "Mayas" },
                    { id: "opt3", text: "Incas" },
                    { id: "opt4", text: "Olmecas" },
                ],
                correctAnswer: 2,
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
