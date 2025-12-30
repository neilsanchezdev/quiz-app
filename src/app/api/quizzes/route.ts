import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { quizMetadata } from "@/lib/quiz-data"

export async function GET() {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        _count: {
          select: { questions: true },
        },
      },
    })

    return NextResponse.json(
      quizzes.map((quiz: any) => ({
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        difficulty: quiz.difficulty,
        totalQuestions: quiz._count.questions,
        estimatedTime: quiz.estimatedTime,
      })),
    )

  } catch (error) {
    console.error("[v0] Error in /api/quizzes:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
