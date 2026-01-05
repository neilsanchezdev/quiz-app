import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

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

/**
 * Crea un nuevo quiz
 * @param request 
 * @returns 
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validar datos requeridos
    const { title, description, difficulty, estimatedTime, questions } = body

    if (!title || !description || !difficulty || !questions || !Array.isArray(questions)) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, difficulty, questions" },
        { status: 400 },
      )
    }

    if (questions.length === 0) {
      return NextResponse.json({ error: "At least one question is required" }, { status: 400 })
    }

    // Validar cada pregunta
    for (const question of questions) {
      if (!question.question || !question.options || !Array.isArray(question.options)) {
        return NextResponse.json({ error: "Each question must have 'question' and 'options' fields" }, { status: 400 })
      }

      if (question.options.length < 2) {
        return NextResponse.json({ error: "Each question must have at least 2 options" }, { status: 400 })
      }

      if (
        typeof question.correctAnswer !== "number" ||
        question.correctAnswer < 1 ||
        question.correctAnswer > question.options.length
      ) {
        return NextResponse.json(
          { error: `correctAnswer must be a number between 1 and ${question.options.length}` },
          { status: 400 },
        )
      }

      if (!question.timeLimit || !question.points) {
        return NextResponse.json({ error: "Each question must have 'timeLimit' and 'points' fields" }, { status: 400 })
      }
    }

    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        difficulty,
        totalQuestions: questions.length,
        estimatedTime: estimatedTime || `${Math.ceil(questions.length * 0.5)} min`,
        questions: {
          create: questions.map((q: any, index: number) => ({
            question: q.question,
            options: q.options, // MySQL almacena esto como JSON
            correctAnswer: q.correctAnswer,
            timeLimit: q.timeLimit,
            points: q.points,
            order: index + 1,
          })),
        },
      },
      include: {
        questions: true,
      },
    })

    return NextResponse.json({
      success: true,
      quiz: {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        difficulty: quiz.difficulty,
        totalQuestions: quiz.totalQuestions,
        estimatedTime: quiz.estimatedTime,
        questionsCount: quiz.questions.length,
      },
    })
  } catch (error) {
    console.error("[v0] Error creating quiz:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
