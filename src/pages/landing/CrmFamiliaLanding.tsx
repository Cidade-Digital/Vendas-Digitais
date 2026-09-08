import { useState } from "react";
import {
  HeartHandshake, Wallet, CalendarCheck, PlayCircle, Check, ShieldCheck,
  ChevronDown, Sparkles, Star, Clock, Users, Home, Gift,
} from "lucide-react";

/* ----------------------------- Hero ----------------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
            <Sparkles className="h-3.5 w-3.5" /> CRM Família · para casais e pais
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl">
            Transforme o caos diário em harmonia: a ferramenta completa para
            gerenciar os <span className="text-brand-600">negócios, a rotina e a vida</span>{" "}
            da sua família.
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Rotina da casa, finanças do casal, tarefas dos filhos e os pequenos
            negócios da família — tudo organizado em um só lugar, com acesso pelo
            celular e pelo computador.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#oferta"
              className="rounded-xl bg-brand-600 px-6 py-4 text-center text-base font-bold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700"
            >
              Quero Organizar Minha Família Agora
            </a>
            <a
              href="#recursos"
              className="rounded-xl border border-slate-300 px-6 py-4 text-center text-base font-semibold text-slate-700 hover:bg-slate-50"
            >
              Ver recursos
            </a>
          </div>
          <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
            <div className="flex -space-x-2">
              {["A", "M", "J", "P"].map((l) => (
                <span
                  key={l}
                  className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-brand-500 text-xs font-bold text-white"
                >
                  {l}
                </span>
              ))}
            </div>
            <span>
              <strong className="text-slate-700">+2.400 famílias</strong> já usam
            </span>
          </div>
        </div>

        {/* Mockup / vídeo */}
        <div className="relative">
          <div className="aspect-video w-full rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-1.5 border-b border-slate-100 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs text-slate-400">app.crmfamilia.com.br</span>
              </div>
              <div className="grid flex-1 grid-cols-3 gap-3 p-4">
                {[
                  { icon: Home, label: "Rotina da casa" },
                  { icon: Wallet, label: "Finanças" },
                  { icon: Users, label: "Filhos" },
                  { icon: CalendarCheck, label: "Agenda" },
                  { icon: HeartHandshake, label: "Casal" },
                  { icon: Star, label: "Metas" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center gap-2 rounded-xl bg-brand-50 p-3 text-center"
                  >
                    <Icon className="h-6 w-6 text-brand-600" />
                    <span className="text-[11px] font-medium text-slate-600">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-brand-600 shadow-xl transition hover:scale-105">
            <PlayCircle className="h-10 w-10" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Dores --------------------------- */
const pains = [
  {
    problem: "Falta de tempo e sobrecarga mental",
    solution:
      "Rotinas e tarefas recorrentes automáticas, divididas entre o casal — cada um sabe o que fazer sem precisar cobrar.",
  },
  {
    problem: "Brigas por causa de dinheiro",
    solution:
      "Orçamento familiar compartilhado, contas a pagar e metas de economia visíveis para os dois em tempo real.",
  },
  {
    problem: "Esquecimento de compromissos dos filhos",
    solution:
      "Agenda escolar, hábitos e tarefas das crianças com lembretes e recompensas por conclusão.",
  },
  {
    problem: "Bagunça nos negócios da família",
    solution:
      "Controle de clientes, pedidos e caixa dos pequenos negócios do casal, separado das finanças pessoais.",
  },
];

function Pains() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
      <h2 className="text-center text-3xl font-extrabold text-ink">
        Você reconhece esses problemas?
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
        O CRM Família foi desenhado a partir da rotina real de casais que fazem
        tudo ao mesmo tempo.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {pains.map((p) => (
          <div
            key={p.problem}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="text-sm font-bold uppercase tracking-wide text-red-500">
              A dor
            </div>
            <p className="mt-1 font-semibold text-slate-800">{p.problem}</p>
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-brand-50 p-4">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
              <p className="text-sm text-slate-700">{p.solution}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------- Recursos -------------------------- */
const features = [
  {
    icon: HeartHandshake,
    title: "Módulo Gestão do Casal & Casa",
    items: [
      "Lista de tarefas domésticas dividida de forma justa",
      "Planejador de refeições e lista de compras",
      "Agenda compartilhada e combinados do casal",
      "Cofrinho de metas (viagem, reforma, reserva)",
    ],
  },
  {
    icon: Wallet,
    title: "Módulo Negócios da Família & Finanças",
    items: [
      "Orçamento mensal com categorias e alertas",
      "Contas a pagar e a receber com lembretes",
      "Caixa separado para o negócio do casal",
      "Relatórios simples de lucro e despesas",
    ],
  },
  {
    icon: CalendarCheck,
    title: "Módulo Rotina & Filhos",
    items: [
      "Quadro de tarefas e hábitos das crianças",
      "Agenda escolar, provas e atividades",
      "Sistema de recompensas e mesada digital",
      "Rotina de sono e estudos",
    ],
  },
];

function Features() {
  return (
    <section id="recursos" className="bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-center text-3xl font-extrabold text-ink">
          Tudo o que sua família precisa, em 3 módulos
        </h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, items }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="inline-flex rounded-xl bg-brand-100 p-3 text-brand-700">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
              <ul className="mt-4 space-y-2">
                {items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Oferta --------------------------- */
const bonuses = [
  { title: "Planilha de Orçamento Familiar 50/30/20", value: 47 },
  { title: "Guia: Reunião de Casal em 20 minutos", value: 37 },
  { title: "Templates de Rotina e Hábitos para Filhos", value: 57 },
  { title: "Aula: Organização do Negócio da Família", value: 97 },
];

function Offer() {
  const [installments, setInstallments] = useState(12);
  const price = 197;
  const fullPrice = 497;
  const perMonth = (price / installments) * 1.0399;

  return (
    <section id="oferta" className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="text-center text-3xl font-extrabold text-ink">
          Oferta especial de lançamento
        </h2>

        <div className="mt-10 overflow-hidden rounded-3xl border border-brand-200 bg-white shadow-xl">
          <div className="bg-brand-600 px-6 py-4 text-center text-sm font-bold uppercase tracking-wide text-white">
            Acesso completo · 12 meses de atualizações
          </div>
          <div className="p-8">
            <div className="text-center">
              <p className="text-slate-400 line-through">De {brl(fullPrice)}</p>
              <p className="text-5xl font-extrabold text-ink">{brl(price)}</p>
              <p className="mt-1 text-sm text-slate-500">
                ou {installments}x de{" "}
                <strong className="text-slate-700">{brl(perMonth)}</strong>
              </p>

              <div className="mx-auto mt-4 flex max-w-xs items-center gap-3">
                <span className="text-xs text-slate-500">Simular parcelas</span>
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={installments}
                  onChange={(e) => setInstallments(Number(e.target.value))}
                  className="flex-1 accent-brand-600"
                />
                <span className="w-6 text-sm font-bold text-brand-700">
                  {installments}x
                </span>
              </div>
            </div>

            <ul className="mt-8 space-y-3">
              <li className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Check className="h-4 w-4 text-brand-600" /> Os 3 módulos completos
                (Casal & Casa, Finanças & Negócios, Rotina & Filhos)
              </li>
              <li className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Check className="h-4 w-4 text-brand-600" /> Até 6 perfis por conta
                (casal + filhos)
              </li>
              <li className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Check className="h-4 w-4 text-brand-600" /> App web e mobile,
                sincronização em tempo real
              </li>
              <li className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Check className="h-4 w-4 text-brand-600" /> Suporte por e-mail e
                comunidade
              </li>
            </ul>

            <div className="mt-8 rounded-2xl bg-slate-50 p-5">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Gift className="h-5 w-5 text-brand-600" /> Bônus inclusos hoje
              </div>
              <ul className="mt-3 space-y-2">
                {bonuses.map((b) => (
                  <li
                    key={b.title}
                    className="flex items-center justify-between text-sm text-slate-600"
                  >
                    <span className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-brand-600" />
                      {b.title}
                    </span>
                    <span className="text-slate-400 line-through">{brl(b.value)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-right text-xs font-semibold text-brand-700">
                Valor total em bônus: {brl(bonuses.reduce((s, b) => s + b.value, 0))}
              </p>
            </div>

            <a
              href="https://pay.kirvano.com/crm-familia"
              className="mt-8 block rounded-xl bg-brand-600 px-6 py-4 text-center text-lg font-bold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700"
            >
              Garantir meu acesso agora
            </a>

            <div className="mt-6 flex items-center justify-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
              <ShieldCheck className="h-8 w-8 shrink-0 text-emerald-600" />
              <p className="text-sm text-emerald-800">
                <strong>Garantia incondicional de 7 dias.</strong> Se não fizer
                sentido para a sua família, devolvemos 100% do valor.
              </p>
            </div>

            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
              <Clock className="h-3.5 w-3.5" /> Pagamento seguro via Kirvano /
              Hotmart · cartão, Pix e boleto
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- FAQ ----------------------------- */
const faqs = [
  {
    q: "Como recebo o acesso após a compra?",
    a: "O acesso é liberado automaticamente por e-mail em até 5 minutos após a confirmação do pagamento (imediato no cartão e no Pix).",
  },
  {
    q: "Funciona no celular e no computador?",
    a: "Sim. O CRM Família é um app web responsivo que funciona em qualquer navegador — Android, iPhone, notebook e desktop — com sincronização em tempo real entre os perfis.",
  },
  {
    q: "Meu cônjuge e meus filhos podem usar a mesma conta?",
    a: "Sim. O plano inclui até 6 perfis. Você define permissões diferentes para o casal e para as crianças.",
  },
  {
    q: "Preciso instalar alguma coisa?",
    a: "Não. Basta acessar pelo navegador e, se quiser, adicionar o atalho à tela inicial do celular.",
  },
  {
    q: "E se eu não gostar?",
    a: "Você tem 7 dias de garantia. Basta responder o e-mail de suporte e devolvemos todo o valor, sem perguntas.",
  },
  {
    q: "O suporte ajuda na configuração inicial?",
    a: "Sim. Você recebe um guia de primeiros passos e pode tirar dúvidas por e-mail e na comunidade de membros.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="text-center text-3xl font-extrabold text-ink">
          Perguntas frequentes
        </h2>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <div
              key={f.q}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-slate-800"
              >
                {f.q}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-400 transition ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <p className="px-5 pb-5 text-sm text-slate-600">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Footer ---------------------------- */
function Footer() {
  return (
    <footer className="bg-ink py-10 text-slate-400">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 font-bold text-white">
            <HeartHandshake className="h-5 w-5 text-brand-500" /> CRM Família
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#" className="hover:text-white">Termos de Uso</a>
            <a href="#" className="hover:text-white">Política de Privacidade</a>
            <a href="#" className="hover:text-white">Suporte</a>
          </nav>
        </div>
        <p className="mt-6 text-center text-xs">
          © {new Date().getFullYear()} Vendas Digitais. Todos os direitos
          reservados. Este produto não faz parte do Facebook/Meta nem é
          endossado por eles.
        </p>
      </div>
    </footer>
  );
}

/* --------------------------- helpers --------------------------- */
function brl(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/* ---------------------------- Page ---------------------------- */
export default function CrmFamiliaLanding() {
  return (
    <div className="bg-white">
      <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <span className="flex items-center gap-2 font-extrabold text-ink">
            <HeartHandshake className="h-5 w-5 text-brand-600" /> CRM Família
          </span>
          <a
            href="#oferta"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700"
          >
            Assinar agora
          </a>
        </div>
      </header>
      <Hero />
      <Pains />
      <Features />
      <Offer />
      <Faq />
      <Footer />
    </div>
  );
}
