import { useState } from "react";

export default function App() {
  const [next, setNext] = useState<string | null>(null);

  return (
    <div className="container py-10 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Fut Draft — MVP
        </h1>
        <span className="text-sm/none opacity-70">
          React + Vite + Tailwind
        </span>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Login" desc="Entrar no sistema (e-mail/senha) — em breve" />
        <Card title="Dashboard" desc="Lista de jogos — em breve" />
        <Card title="Criar Jogo" desc="Data, local, tamanho do time — em breve" />
        <Card title="Jogadores" desc="Adicionar/remover nomes — em breve" />
        <Card title="Sorteio" desc="Formar times A/B/C/D — em breve" />
        <Card title="Resultado" desc="Gols/assistências e vencedor — em breve" />
        <Card title="Stories" desc="Gerar imagem 1080x1920 — em breve" />
      </div>

      <footer className="text-xs opacity-60">
        Configure o back em seguida e ligamos tudo via API.
      </footer>
    </div>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 hover:bg-neutral-900 transition">
      <div className="font-semibold">{title}</div>
      <div className="text-sm opacity-80">{desc}</div>
    </div>
  );
}
