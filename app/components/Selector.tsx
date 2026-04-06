"use client"

import { useState, useEffect, useRef } from "react"
import { getRecommendation, type Answers, type Agent } from "@/lib/decision-tree"

const QUESTIONS = [
  {
    id: "profession",
    text: "Qual é o seu perfil?",
    options: [
      "Freelancer / Prestador de serviço",
      "Coach / Mentor / Terapeuta",
      "Consultor / Especialista",
      "Criador de conteúdo / Influencer",
      "Infoprodutor / Criador de cursos",
      "Outro profissional autônomo",
    ],
  },
  {
    id: "stage",
    text: "Em qual fase você está hoje?",
    options: [
      { label: "Começando — ainda sem clientes consistentes", value: "A" },
      { label: "Alguns clientes, mas a receita é instável", value: "B" },
      { label: "Receita consistente — quero crescer", value: "C" },
      { label: "Crescendo — preciso de sistemas para escalar", value: "D" },
    ],
  },
  {
    id: "pain",
    text: "Qual é o maior desafio do seu negócio agora?",
    options: [
      { label: "Preciso de mais clientes / leads", value: "A" },
      { label: "Preciso vender melhor / converter mais", value: "B" },
      { label: "Preciso criar conteúdo e construir audiência", value: "C" },
      { label: "Preciso organizar e automatizar minha operação", value: "D" },
      { label: "Preciso criar ou melhorar minha oferta", value: "E" },
      { label: "Preciso de estratégia — não sei qual direção tomar", value: "F" },
    ],
  },
  {
    id: "channel",
    text: "Onde você atua principalmente?",
    options: [
      { label: "Instagram / TikTok / YouTube (orgânico)", value: "A" },
      { label: "Tráfego pago — Meta Ads ou Google Ads", value: "B" },
      { label: "LinkedIn / networking / indicações", value: "C" },
      { label: "E-mail / lista própria", value: "D" },
      { label: "Ainda não tenho canal definido", value: "E" },
    ],
  },
  {
    id: "goal",
    text: "O que você quer conquistar nos próximos 90 dias?",
    options: [
      { label: "Conseguir meus primeiros clientes", value: "A" },
      { label: "Faturar R$5k–R$10k/mês de forma consistente", value: "B" },
      { label: "Lançar meu primeiro produto digital", value: "C" },
      { label: "Crescer minha audiência e autoridade", value: "D" },
      { label: "Escalar para R$50k/mês ou mais", value: "E" },
      { label: "Organizar e automatizar meu negócio", value: "F" },
    ],
  },
]

type Message =
  | { type: "bot"; text: string }
  | { type: "user"; text: string }
  | { type: "typing" }
  | { type: "options"; questionIndex: number }
  | { type: "result"; agents: Agent[]; order: string; nextStep: string }

const SQUAD_COLORS: Record<string, string> = {
  Hormozi: "from-orange-500/20 to-orange-600/10 border-orange-500/30",
  Copy: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
  Brand: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
  Solo: "from-green-500/20 to-green-600/10 border-green-500/30",
  Traffic: "from-red-500/20 to-red-600/10 border-red-500/30",
  "Advisory Board": "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30",
  "C-Level": "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
  Storytelling: "from-pink-500/20 to-pink-600/10 border-pink-500/30",
  Data: "from-teal-500/20 to-teal-600/10 border-teal-500/30",
}

export default function Selector() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Partial<Answers>>({})
  const [done, setDone] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    // Initial message
    addBotMessage("Olá! Sou o Squad Selector do 1PB Squad.", 300)
    addBotMessage("Vou te fazer 5 perguntas rápidas e montar o time de agentes ideal para o seu negócio.", 900)
    addQuestion(0, 1800)
  }, [])

  function addBotMessage(text: string, delay: number) {
    setTimeout(() => {
      setMessages(prev => [...prev, { type: "typing" }])
      setTimeout(() => {
        setMessages(prev => {
          const filtered = prev.filter(m => m.type !== "typing")
          return [...filtered, { type: "bot", text }]
        })
      }, 600)
    }, delay)
  }

  function addQuestion(index: number, delay: number) {
    setTimeout(() => {
      setMessages(prev => [...prev, { type: "typing" }])
      setTimeout(() => {
        setMessages(prev => {
          const filtered = prev.filter(m => m.type !== "typing")
          return [
            ...filtered,
            { type: "bot", text: QUESTIONS[index].text },
            { type: "options", questionIndex: index },
          ]
        })
      }, 600)
    }, delay)
  }

  function handleAnswer(questionIndex: number, label: string, value?: string) {
    const question = QUESTIONS[questionIndex]
    const answerValue = value ?? label

    // Remove options from messages, add user reply
    setMessages(prev => {
      const filtered = prev.filter(
        m => !(m.type === "options" && m.questionIndex === questionIndex)
      )
      return [...filtered, { type: "user", text: label }]
    })

    const newAnswers = { ...answers, [question.id]: answerValue }
    setAnswers(newAnswers)

    const nextIndex = questionIndex + 1

    if (nextIndex < QUESTIONS.length) {
      setCurrentQuestion(nextIndex)
      addQuestion(nextIndex, 800)
    } else {
      // All answered — show result
      setCurrentQuestion(5)
      setTimeout(() => {
        setMessages(prev => [...prev, { type: "typing" }])
        setTimeout(() => {
          const result = getRecommendation(newAnswers as Answers)
          setMessages(prev => {
            const filtered = prev.filter(m => m.type !== "typing")
            return [
              ...filtered,
              {
                type: "bot",
                text: "Perfeito. Analisei seu perfil e montei o seu squad personalizado 👇",
              },
              {
                type: "result",
                agents: result.agents,
                order: result.order,
                nextStep: result.nextStep,
              },
            ]
          })
          setDone(true)
        }, 1200)
      }, 800)
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-sm font-bold">
          1PB
        </div>
        <div>
          <p className="font-semibold text-sm">Squad Selector</p>
          <p className="text-xs text-white/40">1PB Squad • Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => {
          if (msg.type === "typing") {
            return (
              <div key={i} className="flex items-end gap-2">
                <div className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center text-xs">
                  🎯
                </div>
                <div className="bg-white/8 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                  <span className="dot-1 w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />
                  <span className="dot-2 w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />
                  <span className="dot-3 w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />
                </div>
              </div>
            )
          }

          if (msg.type === "bot") {
            return (
              <div key={i} className="flex items-end gap-2 animate-fade-in-up">
                <div className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center text-xs flex-shrink-0">
                  🎯
                </div>
                <div className="bg-white/8 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[85%]">
                  <p className="text-sm leading-relaxed text-white/90">{msg.text}</p>
                </div>
              </div>
            )
          }

          if (msg.type === "user") {
            return (
              <div key={i} className="flex justify-end animate-fade-in-up">
                <div className="bg-orange-500/30 border border-orange-500/30 rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%]">
                  <p className="text-sm text-white/90">{msg.text}</p>
                </div>
              </div>
            )
          }

          if (msg.type === "options") {
            const q = QUESTIONS[msg.questionIndex]
            return (
              <div key={i} className="flex flex-col gap-2 pl-9 animate-fade-in-up">
                {q.options.map((opt, j) => {
                  const label = typeof opt === "string" ? opt : opt.label
                  const value = typeof opt === "string" ? opt : opt.value
                  return (
                    <button
                      key={j}
                      onClick={() => handleAnswer(msg.questionIndex, label, value)}
                      className="text-left px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/12 hover:border-orange-400/50 transition-all text-sm text-white/80 hover:text-white"
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            )
          }

          if (msg.type === "result") {
            return (
              <div key={i} className="space-y-3 animate-fade-in-up">
                {/* Agent cards */}
                {msg.agents.map((agent, j) => (
                  <div
                    key={j}
                    className={`rounded-2xl border bg-gradient-to-br p-4 ${SQUAD_COLORS[agent.squad] ?? "from-white/10 to-white/5 border-white/20"}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-white/40 font-medium">
                          {agent.squad}
                        </span>
                        <p className="font-semibold text-sm text-white">{agent.name}</p>
                      </div>
                      <code className="text-xs bg-black/30 px-2 py-1 rounded-lg text-white/60 font-mono">
                        {agent.command}
                      </code>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed mb-2">{agent.why}</p>
                    <p className="text-xs text-white/40">
                      <span className="text-white/30">Comece com:</span> "{agent.startWith}"
                    </p>
                  </div>
                ))}

                {/* Order & Next step */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Ordem de ativação</p>
                    <p className="text-sm text-white/80">{msg.order}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Seu próximo passo agora</p>
                    <p className="text-sm text-white/90">{msg.nextStep}</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/15 to-orange-600/5 p-5 text-center space-y-3">
                  <p className="text-sm text-white/70">
                    Para ativar esses agentes você precisa do
                  </p>
                  <p className="text-xl font-bold text-white">1PB Squad</p>
                  <p className="text-xs text-white/50">
                    150 agentes • Acesso vitalício • Instala em 5 minutos
                  </p>
                  <a
                    href="https://1pbsquad.com.br"
                    className="block w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                  >
                    Quero o 1PB Squad por R$197 →
                  </a>
                  <p className="text-xs text-white/30">Garantia de 30 dias</p>
                </div>
              </div>
            )
          }

          return null
        })}
        <div ref={bottomRef} />
      </div>

      {/* Footer */}
      {done && (
        <div className="px-4 py-3 border-t border-white/10 text-center">
          <button
            onClick={() => {
              setMessages([])
              setAnswers({})
              setCurrentQuestion(0)
              setDone(false)
              setTimeout(() => {
                addBotMessage("Vamos recomeçar!", 300)
                addQuestion(0, 1200)
              }, 100)
            }}
            className="text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            Refazer o quiz
          </button>
        </div>
      )}
    </div>
  )
}
