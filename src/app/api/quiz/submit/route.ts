import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { calculateScore } from "@/lib/quiz-scoring"
import { quizQuestionBanks, quizSessions } from "@/lib/quiz-data"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { sessionId, questionId, selectedOption, timeUsed } = body

        // Validar parámetros
        if (!sessionId || !questionId || selectedOption === undefined || timeUsed === undefined) {
            return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
        }

        // const session = quizSessions.get(sessionId)

        // if (!session) {
        //     return NextResponse.json({ error: "Invalid session" }, { status: 404 })
        // }

        // const existingAnswer = session.answers.find((a) => a.questionId === questionId)

        // if (existingAnswer) {
        //     return NextResponse.json({ error: "Question already answered" }, { status: 400 })
        // }

        // const questions = quizQuestionBanks[session.quizId]
        // const question = questions.find((q) => q.id === questionId)

        // if (!question) {
        //     return NextResponse.json({ error: "Question not found" }, { status: 404 })
        // }

        // const isCorrect = selectedOption === question.correctAnswer
        // const score = isCorrect ? calculateScore(timeUsed, question.maxTime, question.points) : 0

        // session.answers.push({
        //     questionId,
        //     selectedOption,
        //     isCorrect,
        //     timeSpent: timeUsed,
        //     pointsEarned: score,
        // })

        // session.totalScore += score

        // return NextResponse.json({
        //     isCorrect,
        //     correctAnswer: question.correctAnswer,
        //     score,
        //     timeUsed,
        // })

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

        const isCorrect = selectedOption === question.correctAnswer
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
