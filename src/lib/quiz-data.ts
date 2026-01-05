export interface QuizQuestion {
    id: string
    question: string
    options: { id: number; text: string }[]
    correctAnswer: number
    maxTime: number // in seconds
    points: number
}

export interface SafeQuizQuestion {
    id: string
    question: string
    options: { id: number; text: string }[]
    maxTime: number
    points: number
}

export interface Quiz {
    id: string
    title: string
    description: string
    difficulty: "Fácil" | "Medio" | "Difícil"
    totalQuestions: number
    estimatedTime: string
    isActive?: boolean
}

export interface QuizSession {
    id: string
    quizId: string
    userName: string // Agregado nombre del usuario
    userEmail: string // Actualizado con correo del usuario
    userPhone: string // Actualizado con teléfono del usuario
    answers: UserAnswer[]
    totalScore: number
    startedAt: Date
    completedAt?: Date
}

export interface UserAnswer {
    questionId: string
    selectedOption: number
    isCorrect: boolean
    timeSpent: number
    pointsEarned: number
}

export const quizQuestionBanks: Record<string, QuizQuestion[]> = {
    "cultura-general": [
        {
            id: "cg-1",
            question: "¿Cuál es la capital de Francia?",
            options: [
                { id: 0, text: "Londres" },
                { id: 1, text: "París" },
                { id: 2, text: "Madrid" },
                { id: 3, text: "Roma" },
            ],
            correctAnswer: 1,
            maxTime: 15,
            points: 10,
        },
        {
            id: "cg-2",
            question: "¿Quién pintó la Mona Lisa?",
            options: [
                { id: 0, text: "Vincent van Gogh" },
                { id: 1, text: "Pablo Picasso" },
                { id: 2, text: "Leonardo da Vinci" },
                { id: 3, text: "Miguel Ángel" },
            ],
            correctAnswer: 2,
            maxTime: 20,
            points: 15,
        },
        {
            id: "cg-3",
            question: "¿En qué año llegó el hombre a la Luna?",
            options: [
                { id: 0, text: "1965" },
                { id: 1, text: "1969" },
                { id: 2, text: "1972" },
                { id: 3, text: "1975" },
            ],
            correctAnswer: 1,
            maxTime: 15,
            points: 10,
        },
        {
            id: "cg-4",
            question: "¿Cuál es el océano más grande del mundo?",
            options: [
                { id: 0, text: "Atlántico" },
                { id: 1, text: "Índico" },
                { id: 2, text: "Ártico" },
                { id: 3, text: "Pacífico" },
            ],
            correctAnswer: 3,
            maxTime: 12,
            points: 8,
        },
        {
            id: "cg-5",
            question: "¿Quién escribió Don Quijote de la Mancha?",
            options: [
                { id: 0, text: "Miguel de Cervantes" },
                { id: 1, text: "Gabriel García Márquez" },
                { id: 2, text: "Federico García Lorca" },
                { id: 3, text: "Pablo Neruda" },
            ],
            correctAnswer: 0,
            maxTime: 18,
            points: 12,
        },
    ],
    ciencias: [
        {
            id: "ci-1",
            question: "¿Cuál es el símbolo químico del oro?",
            options: [
                { id: 0, text: "Go" },
                { id: 1, text: "Au" },
                { id: 2, text: "Ag" },
                { id: 3, text: "Or" },
            ],
            correctAnswer: 1,
            maxTime: 15,
            points: 10,
        },
        {
            id: "ci-2",
            question: "¿Cuántos planetas tiene el sistema solar?",
            options: [
                { id: 0, text: "7" },
                { id: 1, text: "8" },
                { id: 2, text: "9" },
                { id: 3, text: "10" },
            ],
            correctAnswer: 1,
            maxTime: 12,
            points: 8,
        },
        {
            id: "ci-3",
            question: "¿Cuál es la velocidad de la luz?",
            options: [
                { id: 0, text: "300,000 km/s" },
                { id: 1, text: "150,000 km/s" },
                { id: 2, text: "450,000 km/s" },
                { id: 3, text: "600,000 km/s" },
            ],
            correctAnswer: 0,
            maxTime: 20,
            points: 15,
        },
        {
            id: "ci-4",
            question: "¿Qué órgano del cuerpo humano produce insulina?",
            options: [
                { id: 0, text: "Hígado" },
                { id: 1, text: "Riñón" },
                { id: 2, text: "Páncreas" },
                { id: 3, text: "Estómago" },
            ],
            correctAnswer: 2,
            maxTime: 18,
            points: 12,
        },
        {
            id: "ci-5",
            question: "¿Cuál es la partícula subatómica con carga negativa?",
            options: [
                { id: 0, text: "Protón" },
                { id: 1, text: "Neutrón" },
                { id: 2, text: "Electrón" },
                { id: 3, text: "Quark" },
            ],
            correctAnswer: 2,
            maxTime: 15,
            points: 10,
        },
    ],
    "historia-mundial": [
        {
            id: "hm-1",
            question: "¿En qué año comenzó la Segunda Guerra Mundial?",
            options: [
                { id: 0, text: "1935" },
                { id: 1, text: "1939" },
                { id: 2, text: "1941" },
                { id: 3, text: "1945" },
            ],
            correctAnswer: 1,
            maxTime: 15,
            points: 10,
        },
        {
            id: "hm-2",
            question: "¿Quién fue el primer presidente de Estados Unidos?",
            options: [
                { id: 0, text: "Thomas Jefferson" },
                { id: 1, text: "George Washington" },
                { id: 2, text: "Abraham Lincoln" },
                { id: 3, text: "John Adams" },
            ],
            correctAnswer: 1,
            maxTime: 18,
            points: 12,
        },
        {
            id: "hm-3",
            question: "¿En qué año cayó el Muro de Berlín?",
            options: [
                { id: 0, text: "1985" },
                { id: 1, text: "1987" },
                { id: 2, text: "1989" },
                { id: 3, text: "1991" },
            ],
            correctAnswer: 2,
            maxTime: 15,
            points: 10,
        },
        {
            id: "hm-4",
            question: "¿Qué imperio construyó Machu Picchu?",
            options: [
                { id: 0, text: "Azteca" },
                { id: 1, text: "Maya" },
                { id: 2, text: "Inca" },
                { id: 3, text: "Olmeca" },
            ],
            correctAnswer: 2,
            maxTime: 18,
            points: 12,
        },
        {
            id: "hm-5",
            question: "¿Quién descubrió América en 1492?",
            options: [
                { id: 0, text: "Américo Vespucio" },
                { id: 1, text: "Cristóbal Colón" },
                { id: 2, text: "Fernando de Magallanes" },
                { id: 3, text: "Vasco da Gama" },
            ],
            correctAnswer: 1,
            maxTime: 12,
            points: 8,
        },
    ],
}

export const quizMetadata: Quiz[] = [
    {
        id: "cultura-general",
        title: "Cultura General",
        description: "Pon a prueba tus conocimientos generales",
        difficulty: "Fácil",
        totalQuestions: 5,
        estimatedTime: "2 min",
        isActive: true,
    },
    {
        id: "ciencias",
        title: "Ciencias",
        description: "Preguntas sobre física, química y biología",
        difficulty: "Medio",
        totalQuestions: 5,
        estimatedTime: "3 min",
        isActive: true,
    },
    {
        id: "historia-mundial",
        title: "Historia Mundial",
        description: "Eventos históricos importantes",
        difficulty: "Medio",
        totalQuestions: 5,
        estimatedTime: "3 min",
        isActive: true,
    },
]

export const quizSessions = new Map<string, QuizSession>()
