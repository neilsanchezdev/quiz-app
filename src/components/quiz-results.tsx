"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

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
    onRestart: () => void
}

export function QuizResults({ onRestart }: QuizResultsProps) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader className="text-center space-y-4">
                    <div className="flex justify-center">
                        <CheckCircle2 className="w-16 h-16 text-success" />
                    </div>
                    <CardTitle className="text-4xl font-bold text-balance">¡Quiz Completado!</CardTitle>
                    <CardDescription className="text-lg text-pretty">Gracias por completar la evaluación</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-6 rounded-lg bg-secondary/50 text-center space-y-2">
                        <p className="text-lg font-medium">Sus respuestas han sido registradas exitosamente</p>
                        <p className="text-muted-foreground">
                            Nuestro equipo evaluará sus respuestas y le notificaremos los resultados a la brevedad.
                        </p>
                    </div>

                    <Button onClick={onRestart} size="lg" className="w-full">
                        Volver al inicio
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
