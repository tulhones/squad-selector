import Link from "next/link"

const EXPERTS = [
  { name: "Gary Halbert", squad: "Copy", desc: "O mestre das sales letters" },
  { name: "Eugene Schwartz", squad: "Copy", desc: "Breakthrough Advertising" },
  { name: "Alex Hormozi", squad: "Hormozi", desc: "Framework $100M Offers" },
  { name: "Ray Dalio", squad: "Advisory", desc: "Princípios de decisão" },
  { name: "Pedro Sobral", squad: "Traffic", desc: "Tráfego pago BR" },
  { name: "David Ogilvy", squad: "Copy", desc: "O pai da publicidade" },
  { name: "Joseph Campbell", squad: "Story", desc: "A Jornada do Herói" },
  { name: "Charlie Munger", squad: "Advisory", desc: "Mental models" },
  { name: "Naval Ravikant", squad: "Advisory", desc: "Leverage e riqueza" },
  { name: "Marty Neumeier", squad: "Brand", desc: "Brand strategy" },
  { name: "Dan Kennedy", squad: "Copy", desc: "Direct response" },
  { name: "Sean Ellis", squad: "Data", desc: "Growth hacking" },
]

const SQUADS = [
  { name: "Copy", count: 23, icon: "✍️", desc: "Os maiores copywriters da história" },
  { name: "Hormozi", count: 16, icon: "💰", desc: "Ofertas, escala e negócio" },
  { name: "Traffic", count: 16, icon: "📡", desc: "Tráfego pago e mídia" },
  { name: "Brand", count: 15, icon: "🎯", desc: "Branding e posicionamento" },
  { name: "Cybersecurity", count: 15, icon: "🔐", desc: "Segurança digital" },
  { name: "Advisory Board", count: 11, icon: "🧭", desc: "Conselheiros estratégicos" },
  { name: "Storytelling", count: 12, icon: "📖", desc: "Narrativa e persuasão" },
  { name: "Design", count: 8, icon: "🎨", desc: "UX/UI e identidade visual" },
  { name: "Claude Code", count: 8, icon: "⚡", desc: "Domínio total da IA" },
  { name: "Data", count: 7, icon: "📊", desc: "Analytics e growth" },
  { name: "Movement", count: 7, icon: "🔥", desc: "Construção de movimentos" },
  { name: "C-Level", count: 6, icon: "👔", desc: "Liderança executiva" },
  { name: "Solo", count: 6, icon: "🚀", desc: "Exclusivo para o profissional solo" },
]

const FAQS = [
  {
    q: "Preciso saber programar para usar?",
    a: "Não. O Claude Code é uma ferramenta de linha de comando simples. Você instala em 5 minutos seguindo o workshop incluso. Se você consegue instalar um app no celular, consegue usar o 1PB Squad.",
  },
  {
    q: "O que é Claude Code?",
    a: "É a ferramenta de IA da Anthropic (criadores do Claude). Você conversa com o agente diretamente no seu computador, com contexto do seu negócio. É gratuita para baixar.",
  },
  {
    q: "Quantos agentes eu vou usar de verdade?",
    a: "A maioria das pessoas usa 3 a 5 agentes no dia a dia. Os 150 estão disponíveis para qualquer situação — o Playbook e o Squad Selector ajudam você a encontrar os certos para o seu momento.",
  },
  {
    q: "O acesso é vitalício mesmo?",
    a: "Sim. Você paga uma vez e usa para sempre. Toda atualização futura — novos agentes, novas versões — você recebe sem custo adicional.",
  },
  {
    q: "Como funciona a garantia?",
    a: "30 dias incondicional. Se você instalar, usar o workshop, e não encontrar pelo menos 3 agentes que transformam o seu trabalho, devolvemos 100% do seu dinheiro. Sem perguntas. E você fica com o Playbook.",
  },
  {
    q: "Qual é a diferença entre 1PB Squad e outras ferramentas de IA?",
    a: "Ferramentas genéricas de IA não têm identidade, não têm especialidade, não têm método. Cada agente do 1PB Squad é um especialista com framework próprio, comunicação calibrada e foco específico. É a diferença entre falar com uma IA qualquer e falar com o Gary Halbert.",
  },
]

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md">
        <span className="font-bold text-lg tracking-tight">
          1PB <span className="text-orange-400">Squad</span>
        </span>
        <a
          href="#oferta"
          className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
        >
          Quero o 1PB Squad
        </a>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-24 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-medium px-4 py-1.5 rounded-full mb-8">
          🔥 Oferta de lançamento — R$147
        </div>
        <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
          E se você acordasse amanhã<br />
          com{" "}
          <span className="text-orange-400">150 especialistas</span><br />
          prontos para trabalhar<br />
          no seu negócio?
        </h1>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Sem contratar. Sem gerenciar. Sem pagar salário.<br />
          Disponíveis 24 horas — cada um especialista no que faz.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#oferta"
            className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Quero o 1PB Squad por R$147 →
          </a>
          <Link
            href="/selector"
            className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-medium px-8 py-4 rounded-xl text-lg transition-all"
          >
            Descobrir meu squad grátis
          </Link>
        </div>
        <p className="text-white/30 text-sm mt-4">Garantia de 30 dias • Acesso vitalício • Instala em 5 minutos</p>
        <p className="text-orange-400/70 text-sm mt-2 font-medium">150 especialistas por R$147 — menos de R$1 por agente.</p>
      </section>

      {/* PAIN */}
      <section className="py-20 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-white/40 text-sm uppercase tracking-widest text-center mb-12">A realidade do profissional autônomo</p>
          <div className="space-y-6 text-lg md:text-xl text-white/70 leading-relaxed">
            <p>
              Existe uma razão pela qual os maiores negócios do mundo têm times enormes.
            </p>
            <p>
              Não é porque são grandes.<br />
              É porque <strong className="text-white">nenhum ser humano consegue ser especialista em tudo ao mesmo tempo.</strong>
            </p>
            <p>
              O copywriter não é o mesmo que cuida do tráfego. O estrategista não é quem escreve os e-mails. O CEO não fica ajustando criativo de anúncio.
            </p>
            <p className="text-white/90 font-medium text-xl md:text-2xl border-l-2 border-orange-500 pl-6">
              Mas você — o profissional autônomo — faz tudo isso. Sozinho. Todo dia.
            </p>
            <p>
              E os seus melhores horários, a sua energia mais afiada, o seu talento principal... vai para tarefas que não são a sua especialidade.
            </p>
            <p className="text-white font-semibold">
              Isso tem um custo. E não é só tempo.
            </p>
          </div>
        </div>
      </section>

      {/* MECHANISM */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/40 text-sm uppercase tracking-widest mb-4">A solução</p>
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Existe uma forma diferente<br />de operar.
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-16 leading-relaxed">
            O 1PB Squad coloca 150 especialistas de IA à sua disposição — cada um com método próprio, identidade calibrada e foco específico. Você escolhe os 3 a 5 que importam para o seu momento e os ativa direto no Claude Code.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { icon: "🎯", title: "Você escolhe o seu time", desc: "Não são 150 agentes para usar ao mesmo tempo. São 150 especialistas disponíveis — você seleciona os certos para cada situação." },
              { icon: "⚡", title: "Ativa com um comando", desc: "Sem configuração complexa. Um comando no Claude Code e o especialista está pronto para trabalhar com você." },
              { icon: "🔄", title: "Troca quando precisar", desc: "Precisa de copy? Chama o Halbert. Precisa de estratégia? Chama o Ray Dalio. O time muda conforme a tarefa." },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTS */}
      <section className="py-20 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-white/40 text-sm uppercase tracking-widest text-center mb-4">Quem está no seu time</p>
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
            As maiores mentes do mundo.<br />
            <span className="text-orange-400">Trabalhando para você.</span>
          </h2>
          <p className="text-white/50 text-center mb-12 max-w-xl mx-auto">Uma seleção dos especialistas disponíveis no 1PB Squad</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {EXPERTS.map((expert, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-orange-500/30 transition-colors">
                <div className="text-xs text-orange-400/70 font-medium mb-1">{expert.squad}</div>
                <div className="font-semibold text-sm text-white">{expert.name}</div>
                <div className="text-xs text-white/40 mt-0.5">{expert.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/30 text-sm mt-8">+ outros 138 especialistas em 13 squads</p>
        </div>
      </section>

      {/* SQUADS */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-white/40 text-sm uppercase tracking-widest text-center mb-4">Os 13 squads</p>
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            Cobertura completa do seu negócio
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SQUADS.map((squad, i) => (
              <div key={i} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                <span className="text-2xl">{squad.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{squad.name}</span>
                    <span className="text-xs text-orange-400/70 bg-orange-400/10 px-2 py-0.5 rounded-full">{squad.count} agentes</span>
                  </div>
                  <p className="text-xs text-white/40">{squad.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFER */}
      <section id="oferta" className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-2xl mx-auto">
          <p className="text-white/40 text-sm uppercase tracking-widest text-center mb-4">O que você leva hoje</p>
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            Tudo que o profissional autônomo<br />
            <span className="text-orange-400">precisa para ter um time.</span>
          </h2>

          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-3xl p-8 space-y-6">
            {/* Items */}
            {[
              { title: "1PB Squad — 150 Agentes Especializados", desc: "Acesso vitalício aos 150 agentes em 13 squads. Toda atualização futura inclusa.", value: "R$697" },
              { title: "Bônus: O Playbook", desc: "Guia completo de qual agente usar em cada situação do seu negócio. Nunca mais vai ficar perdido.", value: "R$97" },
              { title: "Bônus: Squad Selector", desc: "Ferramenta online gratuita que monta seu time personalizado em 5 perguntas.", value: "R$97" },
              { title: "Bônus: Workshop em Vídeo", desc: "Do zero ao primeiro agente rodando. Você instala e usa no mesmo dia, sem complicação.", value: "R$197" },
            ].map((item, i) => (
              <div key={i} className="flex items-start justify-between gap-4 pb-6 border-b border-white/10 last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <span className="text-orange-400 mt-0.5">✓</span>
                  <div>
                    <p className="font-semibold text-sm text-white">{item.title}</p>
                    <p className="text-xs text-white/50 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <span className="text-white/30 text-sm whitespace-nowrap">{item.value}</span>
              </div>
            ))}

            {/* Total */}
            <div className="pt-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white/40 text-sm">Valor total</span>
                <span className="text-white/40 line-through text-sm">R$1.088</span>
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-black text-xl text-white">Oferta de lançamento</span>
                <div className="text-right">
                  <p className="font-black text-3xl text-orange-400">R$147</p>
                  <p className="text-xs text-white/40">pagamento único</p>
                </div>
              </div>

              <a
                href="https://hotmart.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-4 rounded-xl text-center text-lg transition-colors"
              >
                Quero o 1PB Squad por R$147 →
              </a>
              <p className="text-center text-orange-400/70 text-sm mt-3 font-medium">150 especialistas por menos de R$1 cada.</p>
              <p className="text-center text-white/30 text-xs mt-1">Garantia de 30 dias • Acesso imediato • Pagamento seguro</p>
            </div>
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-6">🛡️</div>
          <h2 className="text-2xl md:text-3xl font-black mb-4">Garantia de 30 dias</h2>
          <p className="text-white/60 leading-relaxed text-lg">
            Instale. Use o workshop. Ative os agentes.<br />
            Se em 30 dias você não encontrar pelo menos 3 agentes que transformam o seu trabalho —{" "}
            <strong className="text-white">devolvemos 100% do seu dinheiro.</strong>
            <br /><br />
            Sem burocracia. Sem perguntas. E você fica com o Playbook.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-12">Perguntas frequentes</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-xl p-6">
                <p className="font-semibold text-white mb-2">{faq.q}</p>
                <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            O profissional autônomo<br />
            <span className="text-orange-400">que tem um time</span><br />
            ganha de quem trabalha sozinho.
          </h2>
          <p className="text-white/50 text-lg mb-10">
            Sempre foi assim. A diferença agora é que o time custa R$147.
          </p>
          <a
            href="https://hotmart.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-bold px-10 py-5 rounded-xl text-xl transition-colors"
          >
            Quero o 1PB Squad por R$147 →
          </a>
          <p className="text-white/30 text-sm mt-4">Garantia de 30 dias • Acesso vitalício • 150 agentes</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-white/5 text-center">
        <p className="text-white/20 text-sm">1PB Squad — Feito para quem toca o próprio negócio.</p>
        <div className="mt-4">
          <Link href="/selector" className="text-white/30 hover:text-white/60 text-xs transition-colors">
            Squad Selector gratuito →
          </Link>
        </div>
      </footer>

    </main>
  )
}
