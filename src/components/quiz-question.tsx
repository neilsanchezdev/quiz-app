"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock } from "lucide-react"

interface SafeQuestion {
    id: string
    question: string
    options: { id: string; text: string }[]
    maxTime: number
    points: number
}

interface QuizQuestionProps {
    question: SafeQuestion
    questionNumber: number
    totalQuestions: number
    onAnswer: (selectedAnswer: string | null, timeUsed: number) => void
}

export function QuizQuestionComponent({ question, questionNumber, totalQuestions, onAnswer }: QuizQuestionProps) {
    const [timeLeft, setTimeLeft] = useState(question.maxTime)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [hasAnswered, setHasAnswered] = useState(false)
    const [startTime, setStartTime] = useState(Date.now())

    useEffect(() => {
        setTimeLeft(question.maxTime)
        setSelectedOption(null)
        setHasAnswered(false)
        setStartTime(Date.now())
    }, [question, question.maxTime])

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    if (!hasAnswered) {
                        handleAnswer(null)
                    }
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [hasAnswered])

    const handleAnswer = (optionIndex: string | null) => {
        if (hasAnswered) return

        setHasAnswered(true)
        setSelectedOption(optionIndex)

        const timeUsed = (Date.now() - startTime) / 1000

        setTimeout(() => {
            onAnswer(optionIndex, timeUsed)
        }, 500)
    }

    const timePercentage = (timeLeft / question.maxTime) * 100
    const getTimerColor = () => {
        if (timePercentage > 50) return "bg-accent"
        if (timePercentage > 25) return "bg-yellow-500"
        return "bg-destructive"
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-3xl">
                <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-muted-foreground">
                            Pregunta {questionNumber} de {totalQuestions}
                        </span>
                        <div className="flex items-center gap-2">
                            <Clock className={`w-5 h-5 ${timeLeft <= 10 ? "text-destructive" : "text-muted-foreground"}`} />
                            <span className={`text-lg font-bold tabular-nums ${timeLeft <= 10 ? "text-destructive" : ""}`}>
                                {timeLeft}s
                            </span>
                        </div>
                    </div>
                    <Progress value={timePercentage} className="h-2 mb-4" indicatorClassName={getTimerColor()} />
                    <CardTitle className="text-2xl text-balance">{question.question}</CardTitle>
                    <p className="text-sm text-muted-foreground">{question.points} puntos</p>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3">
                        {question.options.map((option, index) => {
                            const isSelected = selectedOption === option.id

                            return (
                                <Button
                                    key={option.id}
                                    onClick={() => handleAnswer(option.id)}
                                    disabled={hasAnswered}
                                    variant={isSelected && hasAnswered ? "default" : "outline"}
                                    className={`h-auto min-h-14 justify-start text-left whitespace-normal p-4`}
                                >
                                    <span className="font-semibold mr-3 text-muted-foreground">{String.fromCharCode(65 + index)}.</span>
                                    <span className="text-balance">{option.text}</span>
                                </Button>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
