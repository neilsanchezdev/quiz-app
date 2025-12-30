"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, RotateCcw, CheckCircle2, XCircle, Clock } from "lucide-react"
import { getTimeMultiplier } from "@/lib/quiz-scoring"

interface QuizAnswer {
    questionId: string
    selectedAnswer: string | null
    timeUsed: number
    score: number
    isCorrect: boolean
    correctAnswer: string
}

interface SafeQuestion {
    id: string
    question: string
    options: { id: string; text: string }[]
    maxTime: number
    points: number
}

interface QuizResultsProps {
    answers: QuizAnswer[]
    questions: SafeQuestion[]
    sessionId: string
    onRestart: () => void
}

export function QuizResults({ answers, questions, sessionId, onRestart }: QuizResultsProps) {
    const correctAnswers = answers.filter((answer) => answer.isCorrect).length
    const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0)
    const maxPossibleScore = questions.reduce((sum, q) => sum + q.points, 0)

    const percentage = Math.round((totalScore / maxPossibleScore) * 100)

    const getMessage = () => {
        if (percentage >= 90) return "¡Excelente! Eres un maestro del quiz"
        if (percentage >= 70) return "¡Muy bien! Buen desempeño"
        if (percentage >= 50) return "Bien hecho. Puedes mejorar"
        return "Sigue practicando. ¡Tú puedes!"
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4">
                        <Trophy className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-4xl font-bold text-balance">¡Quiz Completado!</CardTitle>
                    <CardDescription className="text-xl text-pretty">{getMessage()}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="flex flex-col items-center gap-2 p-6 rounded-lg bg-secondary">
                            <div className="text-4xl font-bold text-primary">{totalScore}</div>
                            <p className="text-sm text-muted-foreground">Puntos Totales</p>
                            <p className="text-xs text-muted-foreground">de {maxPossibleScore} posibles</p>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-6 rounded-lg bg-secondary">
                            <div className="text-4xl font-bold text-accent">{percentage}%</div>
                            <p className="text-sm text-muted-foreground">Efectividad</p>
                            <p className="text-xs text-muted-foreground">Puntuación obtenida</p>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-6 rounded-lg bg-secondary">
                            <div className="text-4xl font-bold text-foreground">
                                {correctAnswers}/{questions.length}
                            </div>
                            <p className="text-sm text-muted-foreground">Correctas</p>
                            <p className="text-xs text-muted-foreground">Respuestas acertadas</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-semibold text-lg">Detalle de Respuestas:</h3>
                        {answers.map((answer, index) => {
                            const question = questions.find((q) => q.id === answer.questionId)
                            if (!question) return null

                            const timeMultiplier = getTimeMultiplier(answer.timeUsed, question.maxTime)

                            return (
                                <div key={answer.questionId} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                                    <div className="flex-shrink-0 mt-1">
                                        {answer.isCorrect ? (
                                            <CheckCircle2 className="w-5 h-5 text-success" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-destructive" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-balance">
                                            {index + 1}. {question.question}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {answer.timeUsed.toFixed(1)}s / {question.maxTime}s
                                            </span>
                                            <span>Multiplicador: {timeMultiplier}</span>
                                            <span className="font-semibold text-foreground">{answer.score} pts</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <Button onClick={onRestart} size="lg" className="w-full">
                        <RotateCcw className="w-5 h-5 mr-2" />
                        Reintentar Quiz
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
