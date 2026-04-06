export interface Agent {
  name: string
  command: string
  squad: string
  why: string
  startWith: string
}

export interface Recommendation {
  agents: Agent[]
  order: string
  nextStep: string
}

export interface Answers {
  profession: string
  stage: string
  pain: string
  channel: string
  goal: string
}

const AGENTS: Record<string, Agent> = {
  "hormozi-offers": {
    name: "Hormozi Offers",
    command: "/hormozi:hormozi-offers",
    squad: "Hormozi",
    why: "",
    startWith: "Me descreve o que você vende hoje e para quem.",
  },
  "hormozi-leads": {
    name: "Hormozi Leads",
    command: "/hormozi:hormozi-leads",
    squad: "Hormozi",
    why: "",
    startWith: "Qual é o seu canal principal de aquisição hoje?",
  },
  "hormozi-content": {
    name: "Hormozi Content",
    command: "/hormozi:hormozi-content",
    squad: "Hormozi",
    why: "",
    startWith: "Me conta sobre sua audiência atual e o que você costuma postar.",
  },
  "hormozi-hooks": {
    name: "Hormozi Hooks",
    command: "/hormozi:hormozi-hooks",
    squad: "Hormozi",
    why: "",
    startWith: "Me manda um exemplo de conteúdo recente que não performou como esperado.",
  },
  "hormozi-closer": {
    name: "Hormozi Closer",
    command: "/hormozi:hormozi-closer",
    squad: "Hormozi",
    why: "",
    startWith: "Como é sua conversa de venda hoje? Você faz call, DM ou outro canal?",
  },
  "hormozi-pricing": {
    name: "Hormozi Pricing",
    command: "/hormozi:hormozi-pricing",
    squad: "Hormozi",
    why: "",
    startWith: "Qual é o preço atual da sua oferta e como você chegou nesse número?",
  },
  "hormozi-scale": {
    name: "Hormozi Scale",
    command: "/hormozi:hormozi-scale",
    squad: "Hormozi",
    why: "",
    startWith: "Qual é sua receita atual e qual é a meta de escala?",
  },
  "gary-halbert": {
    name: "Gary Halbert",
    command: "/copy:gary-halbert",
    squad: "Copy",
    why: "",
    startWith: "Me manda o link ou texto da sua página de vendas atual.",
  },
  "eugene-schwartz": {
    name: "Eugene Schwartz",
    command: "/copy:eugene-schwartz",
    squad: "Copy",
    why: "",
    startWith: "Quem é seu cliente ideal e qual é o nível de consciência dele sobre o problema?",
  },
  "donald-miller": {
    name: "Donald Miller",
    command: "/brand:donald-miller",
    squad: "Brand",
    why: "",
    startWith: "Me descreve o que você faz em uma frase. Não precisa ser bonita — só o que sai natural.",
  },
  "solo-strategist": {
    name: "Solo Strategist",
    command: "/solo:solo-strategist",
    squad: "Solo",
    why: "",
    startWith: "Qual é sua receita atual e o que você quer conquistar nos próximos 90 dias?",
  },
  "solo-creator": {
    name: "Solo Creator",
    command: "/solo:solo-creator",
    squad: "Solo",
    why: "",
    startWith: "Quantas vezes por semana você publica conteúdo e em qual plataforma?",
  },
  "solo-launcher": {
    name: "Solo Launcher",
    command: "/solo:solo-launcher",
    squad: "Solo",
    why: "",
    startWith: "O que você vai lançar e qual é a sua data alvo de abertura de carrinho?",
  },
  "solo-operator": {
    name: "Solo Operator",
    command: "/solo:solo-operator",
    squad: "Solo",
    why: "",
    startWith: "Lista as 5 tarefas que mais tomam seu tempo na semana.",
  },
  "solo-growth": {
    name: "Solo Growth",
    command: "/solo:solo-growth",
    squad: "Solo",
    why: "",
    startWith: "O que está funcionando no seu negócio hoje, mesmo que pequeno?",
  },
  "ray-dalio": {
    name: "Ray Dalio",
    command: "/advisory-board:ray-dalio",
    squad: "Advisory Board",
    why: "",
    startWith: "Qual é a decisão mais importante que você precisa tomar agora?",
  },
  "hormozi-models": {
    name: "Hormozi Models",
    command: "/hormozi:hormozi-models",
    squad: "Hormozi",
    why: "",
    startWith: "Me conta como você ganha dinheiro hoje e como imagina ganhar em 1 ano.",
  },
  "pedro-sobral": {
    name: "Pedro Sobral",
    command: "/traffic:pedro-sobral",
    squad: "Traffic",
    why: "",
    startWith: "Quanto você investe por mês em tráfego e qual é seu CPA atual?",
  },
  "creative-analyst": {
    name: "Creative Analyst",
    command: "/traffic:creative-analyst",
    squad: "Traffic",
    why: "",
    startWith: "Me manda os criativos que estão rodando agora — descreve o formato e a mensagem.",
  },
  "coo-orchestrator": {
    name: "COO Orchestrator",
    command: "/c-level:coo-orchestrator",
    squad: "C-Level",
    why: "",
    startWith: "Descreve como é uma semana típica de trabalho sua.",
  },
  "sean-ellis": {
    name: "Sean Ellis",
    command: "/data:sean-ellis",
    squad: "Data",
    why: "",
    startWith: "Quais métricas você acompanha hoje no seu negócio?",
  },
  "matthew-dicks": {
    name: "Matthew Dicks",
    command: "/storytelling:matthew-dicks",
    squad: "Storytelling",
    why: "",
    startWith: "Me conta uma história real da sua vida que tem a ver com o que você ensina ou vende.",
  },
}

function buildAgent(id: string, why: string): Agent {
  return { ...AGENTS[id], why }
}

export function getRecommendation(answers: Answers): Recommendation {
  const { stage, pain, channel, goal } = answers
  const agents: Agent[] = []
  let order = ""
  let nextStep = ""

  const isEarlyStage = stage === "A" || stage === "B"
  const isPaidTraffic = channel === "B"
  const isOrganic = channel === "A"
  const isLaunchGoal = goal === "C"
  const isScaleGoal = goal === "E"

  if (pain === "A") {
    // Need leads
    if (isEarlyStage) {
      agents.push(buildAgent("hormozi-offers", "Antes de gerar leads, sua oferta precisa ser irresistível. Se a oferta for fraca, mais tráfego só aumenta o desperdício."))
      agents.push(buildAgent("hormozi-leads", "Com a oferta afinada, esse agente monta sua máquina de captação — o processo completo de atrair as pessoas certas."))
      agents.push(buildAgent("donald-miller", "Seu posicionamento precisa ser cristalino para atrair as pessoas certas. Se a mensagem é confusa, o lead certo não se identifica."))
    } else {
      agents.push(buildAgent("hormozi-leads", "Você já tem mercado validado. Hora de estruturar um sistema de geração de leads consistente e escalável."))
      agents.push(buildAgent("solo-growth", "Identifica qual alavanca de crescimento você ainda não explorou — qual canal, oferta ou público pode dobrar seus resultados."))
    }
    if (isPaidTraffic) {
      agents.push(buildAgent("pedro-sobral", "Para escalar via tráfego pago no mercado brasileiro, esse é o agente certo — estrutura de campanhas, públicos e criativos."))
    } else if (isOrganic) {
      agents.push(buildAgent("hormozi-content", "Conteúdo que atrai clientes, não só seguidores. Cada post tem uma função estratégica no seu funil."))
    }
    order = "1 → 2 → 3"
    nextStep = "Ative o Hormozi Offers e descreva sua oferta atual. Em 30 minutos você vai saber exatamente o que precisa mudar."

  } else if (pain === "B") {
    // Need to sell better
    agents.push(buildAgent("hormozi-offers", "Baixa conversão quase sempre é problema de oferta — não de copy ou de tráfego. Vamos reconstruir do zero."))
    agents.push(buildAgent("gary-halbert", "Com a oferta corrigida, esse agente escreve a copy que faz o trabalho de vender — página, e-mail ou proposta."))
    agents.push(buildAgent("hormozi-closer", "Para quem vende em conversa (call, DM, reunião) — script de fechamento e manejo de objeções."))
    if (isLaunchGoal) {
      agents.push(buildAgent("solo-launcher", "Se sua meta é lançar, esse agente orquestra todo o processo — do pré-lançamento ao fechamento do carrinho."))
    }
    order = "1 → 2 → 3"
    nextStep = "Ative o Hormozi Offers e compartilhe sua oferta atual. Vamos identificar exatamente o que está travando a conversão."

  } else if (pain === "C") {
    // Need content
    agents.push(buildAgent("hormozi-content", "Conteúdo que constrói audiência qualificada e aquece pra venda. Framework completo de o que postar, quando e por quê."))
    agents.push(buildAgent("hormozi-hooks", "Os primeiros 3 segundos decidem tudo. Esse agente garante que seu conteúdo para o scroll antes de qualquer outra coisa."))
    agents.push(buildAgent("solo-creator", "Sistema de criação de conteúdo para quem trabalha sozinho — pilares, reaproveitamento e consistência sem burnout."))
    if (isPaidTraffic) {
      agents.push(buildAgent("creative-analyst", "Para quem investe em tráfego: análise de criativos que estão rodando e o que testar para melhorar CTR e CPL."))
    }
    order = "1 → 2 → 3"
    nextStep = "Ative o Hormozi Content e me conta sobre sua audiência atual. Vamos montar seu plano de conteúdo em uma sessão."

  } else if (pain === "D") {
    // Need operations
    agents.push(buildAgent("solo-operator", "Identifica o que está te consumindo tempo e transforma em sistemas — SOPs, automações e processos que rodam sem você."))
    agents.push(buildAgent("coo-orchestrator", "Visão executiva de operações: prioridades, delegação e como estruturar um negócio solo que não depende de você para cada detalhe."))
    agents.push(buildAgent("sean-ellis", "Métricas que importam para um negócio solo — o que medir, o que ignorar e como tomar decisões baseadas em dados."))
    order = "1 → 2 → 3"
    nextStep = "Ative o Solo Operator e liste as 5 tarefas que mais tomam seu tempo na semana. Vamos começar por aí."

  } else if (pain === "E") {
    // Need offer
    agents.push(buildAgent("hormozi-offers", "O arquiteto de Grand Slam Offers. Constrói uma oferta tão boa que as pessoas se sentem burras dizendo não."))
    agents.push(buildAgent("hormozi-pricing", "Precificação baseada em valor — como cobrar o que você realmente vale sem perder clientes."))
    agents.push(buildAgent("eugene-schwartz", "Posicionamento e mensagem — como comunicar sua oferta para o nível de consciência certo do seu cliente."))
    order = "1 → 2 → 3"
    nextStep = "Ative o Hormozi Offers agora. Descreva o que você vende, pra quem e por quanto. Em uma sessão a oferta muda."

  } else {
    // Pain F - need strategy
    agents.push(buildAgent("solo-strategist", "Clareza antes de ação. Identifica onde você está, onde quer chegar e qual é o único movimento que desbloqueia tudo."))
    agents.push(buildAgent("ray-dalio", "Tomada de decisão baseada em princípios — como avaliar opções e escolher a direção certa mesmo sem certeza."))
    agents.push(buildAgent("hormozi-models", "Modelos de negócio para empreendedores solo — qual estrutura faz mais sentido para sua meta e seu momento."))
    order = "1 → 2 → 3"
    nextStep = "Ative o Solo Strategist. Me fala: qual é sua receita hoje e o que você quer nos próximos 90 dias? Vamos montar o plano."
  }

  // Add storytelling if organic content channel
  if (isOrganic && agents.length < 4 && pain !== "C") {
    agents.push(buildAgent("matthew-dicks", "Para quem trabalha com conteúdo orgânico: histórias reais que criam conexão e autoridade antes da venda."))
  }

  // Add launcher if goal is launch
  if (isLaunchGoal && !agents.find(a => a.command === "/solo:solo-launcher")) {
    agents.push(buildAgent("solo-launcher", "Sua meta é lançar — esse agente orquestra tudo do pré-lançamento ao fechamento do carrinho para quem trabalha sozinho."))
  }

  // Add scale if goal is scale
  if (isScaleGoal && !agents.find(a => a.command === "/solo:solo-growth") && agents.length < 5) {
    agents.push(buildAgent("solo-growth", "Sua meta é escalar — esse agente identifica os alavancas de crescimento que você ainda não explorou."))
  }

  // Cap at 5 agents
  const finalAgents = agents.slice(0, 5)

  return { agents: finalAgents, order, nextStep }
}
