"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen, FlaskConical, Globe } from "lucide-react"
import { Logo } from "@/components/logo"

interface Quiz {
    id: string
    title: string
    description: string
    difficulty: "Fácil" | "Medio" | "Difícil"
    totalQuestions: number
    estimatedTime: string
}

interface QuizListProps {
    quizzes: Quiz[]
    onSelectQuiz: (quizId: string) => void
}

const iconMap = {
    "general-knowledge": Globe,
    science: FlaskConical,
    history: BookOpen,
}

const difficultyColors = {
    Fácil: "text-green-600 bg-green-50",
    Medio: "text-yellow-600 bg-yellow-50",
    Difícil: "text-red-600 bg-red-50",
}

export function QuizList({ quizzes, onSelectQuiz }: QuizListProps) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-6xl space-y-8">
                <div className="text-center space-y-4">
                    <div className="flex justify-center mb-6">
                        <div className="bg-primary p-6 rounded-lg shadow-lg">
                            <Logo className="w-16 h-16" />

                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-balance">Elige tu Quiz</h1>
                    <p className="text-lg text-muted-foreground text-pretty">
                        Selecciona un quiz y pon a prueba tus conocimientos
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {quizzes.map((quiz) => {
                        const Icon = iconMap[quiz.id as keyof typeof iconMap] || Globe
                        return (
                            <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-primary-foreground" />
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[quiz.difficulty]}`}>
                                            {quiz.difficulty}
                                        </span>
                                    </div>
                                    <CardTitle className="text-xl text-balance">{quiz.title}</CardTitle>
                                    <CardDescription className="text-pretty">{quiz.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="w-4 h-4" />
                                            <span>{quiz.totalQuestions} preguntas</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>{quiz.estimatedTime}</span>
                                        </div>
                                    </div>
                                    <Button onClick={() => onSelectQuiz(quiz.id)} className="w-full">
                                        Comenzar
                                    </Button>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
