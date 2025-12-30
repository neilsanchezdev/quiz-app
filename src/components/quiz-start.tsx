"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock, Trophy, Zap, User } from "lucide-react"

interface QuizStartProps {
    onStart: (userInfo: { name: string; email: string; phone: string }) => void
    totalQuestions: number
    quizTitle?: string
}

export function QuizStart({ onStart, totalQuestions, quizTitle }: QuizStartProps) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [showForm, setShowForm] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (name.trim() && email.trim() && phone.trim()) {
            onStart({ name: name.trim(), email: email.trim(), phone: phone.trim() })
        }
    }

    const isFormValid = name.trim() !== "" && email.trim() !== "" && phone.trim() !== ""

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                        <Trophy className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-balance">
                        {quizTitle ? `Quiz: ${quizTitle}` : "¡Bienvenido al Quiz!"}
                    </CardTitle>
                    <CardDescription className="text-lg text-pretty">
                        Pon a prueba tus conocimientos y gana puntos respondiendo rápidamente
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {!showForm ? (
                        <>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-secondary">
                                    <Clock className="w-6 h-6 text-primary" />
                                    <p className="text-sm font-medium text-center">Responde a tiempo</p>
                                    <p className="text-xs text-muted-foreground text-center text-balance">
                                        Cada pregunta tiene un límite de tiempo
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-secondary">
                                    <Zap className="w-6 h-6 text-accent" />
                                    <p className="text-sm font-medium text-center">Gana más puntos</p>
                                    <p className="text-xs text-muted-foreground text-center text-balance">
                                        Respuestas rápidas dan más puntos
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-secondary">
                                    <Trophy className="w-6 h-6 text-primary" />
                                    <p className="text-sm font-medium text-center">{totalQuestions} Preguntas</p>
                                    <p className="text-xs text-muted-foreground text-center text-balance">
                                        Completa todas para ver tu resultado
                                    </p>
                                </div>
                            </div>

                            <div className="bg-muted p-4 rounded-lg space-y-2">
                                <h3 className="font-semibold">Sistema de Puntuación:</h3>
                                <ul className="text-sm space-y-1 text-muted-foreground">
                                    <li>• &lt;50% del tiempo: 100% de los puntos</li>
                                    <li>• 50-75% del tiempo: 50% de los puntos</li>
                                    <li>• 75-100% del tiempo: 25% de los puntos</li>
                                    <li>• &gt;100% del tiempo: 0 puntos</li>
                                </ul>
                            </div>

                            <Button onClick={() => setShowForm(true)} size="lg" className="w-full">
                                Comenzar Quiz
                            </Button>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <User className="w-5 h-5 text-primary" />
                                <h3 className="text-lg font-semibold">Información del Participante</h3>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre Completo</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Ingresa tu nombre completo"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Teléfono</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+57 311 567 8900"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex gap-3">
                                <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="flex-1">
                                    Volver
                                </Button>
                                <Button type="submit" disabled={!isFormValid} className="flex-1">
                                    Iniciar Quiz
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
