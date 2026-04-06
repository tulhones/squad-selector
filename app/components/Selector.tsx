"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { getRecommendation, type Answers, type Agent } from "@/lib/decision-tree"

const QUESTIONS = [
  {
    id: "profession",
    text: "Olá! Para montar o seu squad ideal, preciso te conhecer melhor. Qual é o seu perfil?",
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
    text: "Entendido. Em qual fase está o seu negócio hoje?",
    options: [
      { label: "Começando — ainda sem clientes consistentes", value: "A" },
      { label: "Alguns clientes, mas a receita é instável", value: "B" },
      { label: "Receita consistente — quero crescer", value: "C" },
      { label: "Crescendo — preciso de sistemas para escalar", value: "D" },
    ],
  },
  {
    id: "pain",
    text: "Qual é o maior desafio do seu negócio agora? Escolha o mais urgente.",
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
    text: "Última pergunta. O que você quer conquistar nos próximos 90 dias?",
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

const SQUAD_COLORS: Record<string, { bg: string; border: string; badge: string }> = {
  Hormozi:        { bg: "from-orange-500/15 to-orange-600/5", border: "border-orange-500/25", badge: "bg-orange-500/20 text-orange-300" },
  Copy:           { bg: "from-blue-500/15 to-blue-600/5",    border: "border-blue-500/25",    badge: "bg-blue-500/20 text-blue-300" },
  Brand:          { bg: "from-purple-500/15 to-purple-600/5", border: "border-purple-500/25", badge: "bg-purple-500/20 text-purple-300" },
  Solo:           { bg: "from-green-500/15 to-green-600/5",  border: "border-green-500/25",  badge: "bg-green-500/20 text-green-300" },
  Traffic:        { bg: "from-red-500/15 to-red-600/5",      border: "border-red-500/25",    badge: "bg-red-500/20 text-red-300" },
  "Advisory Board": { bg: "from-yellow-500/15 to-yellow-600/5", border: "border-yellow-500/25", badge: "bg-yellow-500/20 text-yellow-300" },
  "C-Level":      { bg: "from-cyan-500/15 to-cyan-600/5",   border: "border-cyan-500/25",   badge: "bg-cyan-500/20 text-cyan-300" },
  Storytelling:   { bg: "from-pink-500/15 to-pink-600/5",   border: "border-pink-500/25",   badge: "bg-pink-500/20 text-pink-300" },
  Data:           { bg: "from-teal-500/15 to-teal-600/5",   border: "border-teal-500/25",   badge: "bg-teal-500/20 text-teal-300" },
}

type Message =
  | { type: "bot"; text: string }
  | { type: "user"; text: string }
  | { type: "typing" }
  | { type: "options"; questionIndex: number }
  | { type: "result"; agents: Agent[]; order: string; nextStep: string }

function Avatar({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? "w-8 h-8" : "w-10 h-10"
  return (
    <div className={`${dim} rounded-full overflow-hidden flex-shrink-0 ring-2 ring-orange-500/30`}>
      <Image
        src="/avatar.jpg"
        alt="Consultor"
        width={40}
        height={40}
        className="object-cover w-full h-full"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement
          target.style.display = "none"
          const parent = target.parentElement
          if (parent) {
            parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm">1PB</div>`
          }
        }}
      />
    </div>
  )
}

export default function Selector() {
  const [messages, setMessages] = useState<Message[]>([])
  const [answers, setAnswers] = useState<Partial<Answers>>({})
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    addBotMessage("Seja bem-vindo ao Squad Selector do 1PB Squad.", 400)
    addBotMessage("Em 5 perguntas eu monto o time de especialistas ideal para o seu negócio agora.", 1100)
    addQuestion(0, 2000)
  }, [])

  function addBotMessage(text: string, delay: number) {
    setTimeout(() => {
      setMessages(prev => [...prev, { type: "typing" }])
      setTimeout(() => {
        setMessages(prev => [...prev.filter(m => m.type !== "typing"), { type: "bot", text }])
      }, 700)
    }, delay)
  }

  function addQuestion(index: number, delay: number) {
    setTimeout(() => {
      setMessages(prev => [...prev, { type: "typing" }])
      setTimeout(() => {
        setMessages(prev => [
          ...prev.filter(m => m.type !== "typing"),
          { type: "bot", text: QUESTIONS[index].text },
          { type: "options", questionIndex: index },
        ])
      }, 700)
    }, delay)
  }

  function handleAnswer(questionIndex: number, label: string, value?: string) {
    const answerValue = value ?? label
    const newAnswers = { ...answers, [QUESTIONS[questionIndex].id]: answerValue }

    setMessages(prev => [
      ...prev.filter(m => !(m.type === "options" && m.questionIndex === questionIndex)),
      { type: "user", text: label },
    ])
    setAnswers(newAnswers)

    const nextIndex = questionIndex + 1
    setProgress(nextIndex)

    if (nextIndex < QUESTIONS.length) {
      addQuestion(nextIndex, 800)
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, { type: "typing" }])
        setTimeout(() => {
          const result = getRecommendation(newAnswers as Answers)
          setMessages(prev => [
            ...prev.filter(m => m.type !== "typing"),
            { type: "bot", text: "Analisei o seu perfil. Aqui está o seu squad personalizado:" },
            { type: "result", ...result },
          ])
          setDone(true)
          setProgress(5)
        }, 1400)
      }, 800)
    }
  }

  function restart() {
    setMessages([])
    setAnswers({})
    setProgress(0)
    setDone(false)
    setTimeout(() => {
      addBotMessage("Vamos recomeçar!", 300)
      addQuestion(0, 1100)
    }, 100)
  }

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0f]">

      {/* HEADER */}
      <header className="flex-shrink-0 border-b border-white/8 bg-[#0d0d14]">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold tracking-tight text-white/80 hover:text-white transition-colors">
            1PB <span className="text-orange-400">Squad</span>
          </Link>
          <div className="flex items-center gap-3">
            <Avatar size="sm" />
            <div>
              <p className="text-xs font-semibold text-white leading-none">Squad Selector</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                <span className="text-[10px] text-white/40">Consultoria gratuita</span>
              </div>
            </div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        {progress > 0 && (
          <div className="max-w-2xl mx-auto px-4 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-500"
                  style={{ width: `${(progress / 5) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-white/30 w-8 text-right">{progress}/5</span>
            </div>
          </div>
        )}
      </header>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 max-w-2xl mx-auto w-full">
        {messages.map((msg, i) => {

          if (msg.type === "typing") {
            return (
              <div key={i} className="flex items-end gap-3">
                <Avatar />
                <div className="bg-white/8 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                  <span className="dot-1 w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
                  <span className="dot-2 w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
                  <span className="dot-3 w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
                </div>
              </div>
            )
          }

          if (msg.type === "bot") {
            return (
              <div key={i} className="flex items-end gap-3 animate-fade-in-up">
                <Avatar />
                <div className="bg-white/8 border border-white/8 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[82%]">
                  <p className="text-sm leading-relaxed text-white/90">{msg.text}</p>
                </div>
              </div>
            )
          }

          if (msg.type === "user") {
            return (
              <div key={i} className="flex justify-end animate-fade-in-up">
                <div className="bg-orange-500/20 border border-orange-500/25 rounded-2xl rounded-br-sm px-4 py-3 max-w-[78%]">
                  <p className="text-sm text-white/90">{msg.text}</p>
                </div>
              </div>
            )
          }

          if (msg.type === "options") {
            const q = QUESTIONS[msg.questionIndex]
            return (
              <div key={i} className="flex flex-col gap-2 pl-13 animate-fade-in-up" style={{ paddingLeft: "52px" }}>
                {q.options.map((opt, j) => {
                  const label = typeof opt === "string" ? opt : opt.label
                  const value = typeof opt === "string" ? opt : opt.value
                  return (
                    <button
                      key={j}
                      onClick={() => handleAnswer(msg.questionIndex, label, value)}
                      className="text-left px-4 py-3 rounded-xl border border-white/12 bg-white/4 hover:bg-orange-500/10 hover:border-orange-400/40 transition-all text-sm text-white/75 hover:text-white group"
                    >
                      <span className="text-orange-400/50 group-hover:text-orange-400 mr-2 transition-colors">→</span>
                      {label}
                    </button>
                  )
                })}
              </div>
            )
          }

          if (msg.type === "result") {
            const colors = (squad: string) => SQUAD_COLORS[squad] ?? { bg: "from-white/10 to-white/5", border: "border-white/15", badge: "bg-white/10 text-white/60" }
            return (
              <div key={i} className="space-y-3 animate-fade-in-up" style={{ paddingLeft: "52px" }}>

                {/* Agent cards */}
                {msg.agents.map((agent, j) => {
                  const c = colors(agent.squad)
                  return (
                    <div key={j} className={`rounded-2xl border bg-gradient-to-br ${c.bg} ${c.border} p-4`}>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>
                            {agent.squad}
                          </span>
                          <p className="font-bold text-white mt-1">{agent.name}</p>
                        </div>
                        <code className="text-[11px] bg-black/40 px-2 py-1 rounded-lg text-white/50 font-mono whitespace-nowrap flex-shrink-0">
                          {agent.command}
                        </code>
                      </div>
                      <p className="text-xs text-white/55 leading-relaxed mb-2">{agent.why}</p>
                      <p className="text-xs text-white/35 italic">"{agent.startWith}"</p>
                    </div>
                  )
                })}

                {/* Summary card */}
                <div className="rounded-2xl border border-white/10 bg-white/4 p-4 space-y-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/35 mb-1">Ordem de ativação</p>
                    <p className="text-sm text-white/80">{msg.order}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/35 mb-1">Comece agora</p>
                    <p className="text-sm text-white/90">{msg.nextStep}</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="rounded-2xl border border-orange-500/25 bg-gradient-to-br from-orange-500/12 to-transparent p-5">
                  <p className="text-sm text-white/60 mb-1">Para ativar esses agentes você precisa do</p>
                  <p className="text-2xl font-black text-white mb-1">1PB Squad</p>
                  <p className="text-xs text-white/40 mb-4">150 agentes • Acesso vitalício • Instala em 5 minutos</p>
                  <a
                    href="https://pay.hotmart.com/M105247592Q"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-3.5 rounded-xl text-center transition-colors"
                  >
                    Quero o 1PB Squad por R$147 →
                  </a>
                  <p className="text-center text-xs text-white/25 mt-2">Garantia de 30 dias</p>
                </div>
              </div>
            )
          }

          return null
        })}
        <div ref={bottomRef} />
      </div>

      {/* FOOTER */}
      <footer className="flex-shrink-0 border-t border-white/8 bg-[#0d0d14] px-4 py-3 max-w-2xl mx-auto w-full">
        {done ? (
          <div className="flex items-center justify-between">
            <p className="text-xs text-white/30">Squad montado com base no seu perfil</p>
            <button
              onClick={restart}
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Refazer →
            </button>
          </div>
        ) : (
          <p className="text-xs text-white/25 text-center">Consultoria gratuita • Sem cadastro necessário</p>
        )}
      </footer>

    </div>
  )
}
