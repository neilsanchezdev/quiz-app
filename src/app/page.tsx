"use client"

import { useState, useEffect } from "react"
import { QuizList } from "@/components/quiz-list"
import { QuizStart } from "@/components/quiz-start"
import { QuizQuestionComponent } from "@/components/quiz-question"
import { QuizResults } from "@/components/quiz-results"

type QuizState = "list" | "start" | "question" | "results"

interface SafeQuestion {
  id: string
  question: string
  options: { id: string; text: string }[]
  maxTime: number
  points: number
}

interface QuizAnswer {
  questionId: string
  selectedAnswer: string | null // permitir null cuando no se responde
  timeUsed: number
  score: number
  isCorrect: boolean
  correctAnswer: string
}

interface Quiz {
  id: string
  title: string
  description: string
  difficulty: "Fácil" | "Medio" | "Difícil"
  totalQuestions: number
  estimatedTime: string
}

export default function QuizPage() {
  const [state, setState] = useState<QuizState>("list")
  const [selectedQuizId, setSelectedQuizId] = useState<string>("")
  const [sessionId, setSessionId] = useState<string>("")
  const [questions, setQuestions] = useState<SafeQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState<{ name: string; email: string; phone: string } | null>(null)

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const response = await fetch("/api/quizzes")
        const data = await response.json()
        setQuizzes(data)
      } catch (error) {
        console.error("[v0] Error fetching quizzes:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchQuizzes()
  }, [])

  const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null
  const selectedQuiz = quizzes.find((q) => q.id === selectedQuizId)

  const handleSelectQuiz = (quizId: string) => {
    setSelectedQuizId(quizId)
    setState("start")
  }

  const handleStart = async (userData: { name: string; email: string; phone: string }) => {
    try {
      setUserInfo(userData)
      const response = await fetch(`/api/quiz/start?quizId=${selectedQuizId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId: selectedQuizId,
          userName: userData.name,
          userEmail: userData.email,
          userPhone: userData.phone,
        }),
      })
      const data = await response.json()

      setSessionId(data.sessionId)
      setQuestions(data.questions)
      setState("question")
      setCurrentQuestionIndex(0)
      setAnswers([])
    } catch (error) {
      console.error("[v0] Error starting quiz:", error)
    }
  }

  const handleAnswer = async (selectedAnswer: string | null, timeUsed: number) => {
    if (!currentQuestion) {
      console.error("[v0] No current question available")
      return
    }

    try {
      const response = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          questionId: currentQuestion.id,
          selectedOption: selectedAnswer,
          timeUsed,
        }),
      })

      const data = await response.json()

      const newAnswer: QuizAnswer = {
        questionId: currentQuestion.id,
        selectedAnswer,
        timeUsed,
        score: data.score,
        isCorrect: data.isCorrect,
        correctAnswer: data.correctAnswer,
      }

      setAnswers([...answers, newAnswer])

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        setState("results")
      }
    } catch (error) {
      console.error("[v0] Error submitting answer:", error)
    }
  }

  const handleRestart = () => {
    setState("list")
    setSelectedQuizId("")
    setSessionId("")
    setQuestions([])
    setCurrentQuestionIndex(0)
    setAnswers([])
    setUserInfo(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Cargando quizzes...</p>
      </div>
    )
  }

  return (
    <>
      {state === "list" && <QuizList quizzes={quizzes} onSelectQuiz={handleSelectQuiz} />}
      {state === "start" && (
        <QuizStart
          onStart={handleStart}
          totalQuestions={selectedQuiz?.totalQuestions || 5}
          quizTitle={selectedQuiz?.title}
        />
      )}
      {state === "question" && currentQuestion && (
        <QuizQuestionComponent
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
        />
      )}
      {state === "results" && (
        <QuizResults answers={answers} questions={questions} sessionId={sessionId} onRestart={handleRestart} />
      )}
    </>
  )
}
