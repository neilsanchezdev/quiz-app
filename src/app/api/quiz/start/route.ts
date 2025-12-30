import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { quizQuestionBanks, quizSessions, quizMetadata } from "@/lib/quiz-data"
import { randomUUID } from "crypto"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { quizId, userName, userIdType, userIdNumber } = body

        if (!quizId || !userName || !userIdType || !userIdNumber) {
            return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
        }

        // const questions = quizQuestionBanks[quizId]
        // const quizInfo = quizMetadata.find((q) => q.id === quizId)

        // if (!questions || !quizInfo) {
        //     return NextResponse.json({ error: "Quiz no encontrado" }, { status: 404 })
        // }

        // const sessionId = randomUUID()
        // quizSessions.set(sessionId, {
        //     id: sessionId,
        //     quizId,
        //     userName,
        //     userIdType,
        //     userIdNumber,
        //     answers: [],
        //     totalScore: 0,
        //     startedAt: new Date(),
        // })

        // const safeQuestions = questions.map((q) => ({
        //     id: q.id,
        //     question: q.question,
        //     options: q.options,
        //     maxTime: q.maxTime,
        //     points: q.points,
        // }))

        // return NextResponse.json({
        //     sessionId,
        //     questions: safeQuestions,
        //     totalQuestions: safeQuestions.length,
        // })

        const quiz = await prisma.quiz.findUnique({
            where: { id: quizId },
            include: {
                questions: {
                    orderBy: { order: "asc" },
                },
            },
        })

        if (!quiz) {
            return NextResponse.json({ error: "Quiz no encontrado" }, { status: 404 })
        }

        const session = await prisma.quizSession.create({
            data: {
                quizId: quiz.id,
                userName,
                userIdType,
                userIdNumber,
            },
        })

        const safeQuestions = quiz.questions.map((q) => ({
            id: q.id,
            question: q.question,
            options: typeof q.options === "string" ? JSON.parse(q.options) : q.options,
            maxTime: q.timeLimit,
            points: q.points,
        }))

        return NextResponse.json({
            sessionId: session.id,
            questions: safeQuestions,
            totalQuestions: safeQuestions.length,
        })
    } catch (error) {
        console.error("[v0] Error in /api/quiz/start:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
