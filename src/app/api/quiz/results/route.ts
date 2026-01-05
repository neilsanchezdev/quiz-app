import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const sessionId = searchParams.get("sessionId")

        if (!sessionId) {
            return NextResponse.json({ error: "Missing sessionId" }, { status: 400 })
        }

        const session = await prisma.quizSession.findUnique({
            where: { id: sessionId },
            include: {
                quiz: {
                    include: {
                        questions: {
                            orderBy: { order: "asc" },
                        },
                    },
                },
                answers: true,
            },
        })

        if (!session) {
            return NextResponse.json({ error: "Invalid session" }, { status: 404 })
        }

        await prisma.quizSession.update({
            where: { id: sessionId },
            data: {
                completedAt: new Date(),
            },
        })

        const results = session.quiz.questions.map((q) => {
            const answer = session.answers.find((a) => a.questionId === q.id)
            const options = typeof q.options === "string" ? JSON.parse(q.options) : q.options

            return {
                questionId: q.id,
                question: q.question,
                options: options.map((o: { text: string }) => o.text),
                correctAnswer: q.correctAnswer,
                selectedAnswer: answer?.selectedOption ?? -1,
                timeUsed: answer?.timeSpent ?? 0,
                isCorrect: answer?.isCorrect ?? false,
                score: answer?.pointsEarned ?? 0,
                maxPoints: q.points,
            }
        })

        const totalScore = session.totalScore
        const maxPossibleScore = session.quiz.questions.reduce((sum, q) => sum + q.points, 0)
        const percentage = Math.round((totalScore / maxPossibleScore) * 100)

        return NextResponse.json({
            success: true,
            message: "Quiz completado. Sus respuestas han sido registradas y serán evaluadas por nuestro equipo."
        })
    } catch (error) {
        console.error("[v0] Error in /api/quiz/results:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
