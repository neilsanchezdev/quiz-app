import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { calculateScore } from "@/lib/quiz-scoring"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { sessionId, questionId, selectedOption, timeUsed } = body

        console.log("[v0] Submit request:", { sessionId, questionId, selectedOption, timeUsed })

        // Validar parámetros
        if (!sessionId || !questionId || selectedOption === undefined || timeUsed === undefined) {
            return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
        }

        const session = await prisma.quizSession.findUnique({
            where: { id: sessionId },
        })

        if (!session) {
            return NextResponse.json({ error: "Invalid session" }, { status: 404 })
        }

        const existingAnswer = await prisma.userAnswer.findFirst({
            where: {
                sessionId,
                questionId,
            },
        })

        if (existingAnswer) {
            return NextResponse.json({ error: "Question already answered" }, { status: 400 })
        }

        const question = await prisma.question.findUnique({
            where: { id: questionId },
        })

        if (!question) {
            return NextResponse.json({ error: "Question not found" }, { status: 404 })
        }

        const selectedIndex = selectedOption ? Number.parseInt(selectedOption) : null
        const isCorrect = selectedIndex !== null && selectedIndex === question.correctAnswer

        console.log("[v0] Validation:", {
            selectedOption,
            selectedIndex,
            correctAnswer: question.correctAnswer,
            isCorrect,
        })

        const score = isCorrect ? calculateScore(timeUsed, question.timeLimit, question.points) : 0

        await prisma.userAnswer.create({
            data: {
                sessionId,
                questionId,
                selectedOption,
                isCorrect,
                timeSpent: timeUsed,
                pointsEarned: score,
            },
        })

        await prisma.quizSession.update({
            where: { id: sessionId },
            data: {
                totalScore: {
                    increment: score,
                },
            },
        })

        return NextResponse.json({
            isCorrect,
            correctAnswer: question.correctAnswer,
            score,
            timeUsed,
        })
    } catch (error) {
        console.error("[v0] Error in /api/quiz/submit:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
