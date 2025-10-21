// src/pages/AuthLogin.tsx
// ==========================
// Tela de Login da FutDraft — identidade visual aplicada
// • Visual: fundo grafite (#0F1115), acentos verde-limão (#00FF66), tipografia Orbitron/Inter
// • Interações: animações suaves com Framer Motion
// • Responsivo: layout em coluna no mobile e em 2 colunas no desktop
// • Form: React Hook Form apenas para login (email/senha)
// • Logo: basta colocar seu arquivo em /public/futdraft-logo.png e ele já aparece
// --------------------------------------------------------------

import { useForm } from "react-hook-form"; // controla o formulário
import { motion } from "framer-motion"; // animações fluidas
import { useState } from "react";

// Tipos do formulário
type LoginData = {
  email: string;
  password: string;
};

// Dica: garanta que você tenha as fontes no index.html
// <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Orbitron:wght@700;900&display=swap" rel="stylesheet" />

export default function AuthLogin() {
  // Estado simples para exibir feedback de envio (simulação por enquanto)
  const [submitting, setSubmitting] = useState(false);

  // Setup do React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  // Handler de envio (por enquanto apenas loga no console)
  const onSubmit = async (data: LoginData) => {
    setSubmitting(true);
    // Simula uma pequena espera de rede
    await new Promise((r) => setTimeout(r, 800));
    console.log("Login FutDraft:", data);
    setSubmitting(false);
  };

  return (
    // Fundo geral escuro, centraliza conteúdo e cria padding nos lados
    <div className="min-h-screen bg-[#0F1115] text-white flex items-center justify-center p-4">
      {/* Container max-w com duas colunas no desktop */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lado Esquerdo — Hero/Branding com animações */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#111318] to-[#0B0D10] p-8 md:p-10"
        >
          {/* Aros / linhas circulares sutis que remetem ao draft */}
          <div className="pointer-events-none absolute inset-0">
            {/* Halo central com blur */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-[#00FF66]/10 blur-3xl" />
            {/* Anéis concêntricos com borda neon sutil */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.9 + i * 0.05, opacity: 0 }}
                  animate={{
                    scale: 1 + i * 0.05,
                    opacity: 0.8 - i * 0.15,
                  }}
                  transition={{ duration: 0.8 + i * 0.15, ease: "easeOut" }}
                  className="absolute rounded-full border border-[#00FF66]/20"
                  style={{ height: 220 + i * 90, width: 220 + i * 90 }}
                />
              ))}
            </div>
            {/* Partículas girando levemente (dinâmica) */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-[#00FF66]"
                  style={{
                    // distribui os pontos ao redor de um círculo
                    transform: `rotate(${(i * 360) / 10}deg) translateX(180px)`,
                    boxShadow: "0 0 16px #00FF66, 0 0 32px #00FF66",
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Cabeçalho com logo + nome FutDraft (Orbitron para título) */}
          <div className="relative z-10 flex items-center gap-3">
            {/* LOGO: coloque sua imagem em /public/futdraft-logo.png */}
            <img
              src="/futdraft-logo.png"
              alt="FutDraft"
              className="h-12 w-12 shrink-0 select-none"
            />
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide" style={{ fontFamily: "Orbitron, system-ui, sans-serif" }}>
              FutDraft
            </h1>
          </div>

          {/* Slogan/descrição com ênfase na proposta */}
          <div className="relative z-10 mt-6 max-w-md">
            <h2 className="text-xl md:text-2xl font-semibold text-white/90" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
              Diversão organizada. Sorteio com cara de liga.
            </h2>
            <p className="mt-3 text-white/70 leading-relaxed" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
              Crie peladas, confirme presença, sorteie times e registre gols. Tudo no mesmo lugar, com a velocidade que o jogo pede.
            </p>
          </div>

          {/* Destaques em chips minimalistas */}
          <div className="relative z-10 mt-6 flex flex-wrap gap-3">
            {[
              "Sorteio inteligente",
              "Painel do organizador",
              "Times e estatísticas",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA fantasma (apenas visual) */}
          <div className="relative z-10 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-xl border border-[#00FF66]/30 bg-[#00FF66]/10 px-4 py-2"
            >
              <div className="h-2 w-2 rounded-full bg-[#00FF66] shadow-[0_0_12px_#00FF66]" />
              <span className="text-sm text-white/90" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                Tudo pronto para o próximo jogo
              </span>
            </motion.div>
          </div>
        </motion.section>

        {/* Lado Direito — Card do formulário */}
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-3xl border border-white/10 bg-[#0B0D10]/80 backdrop-blur p-6 md:p-10"
        >
          {/* Cabeçalho do card */}
          <div className="mb-8">
            <h3
              className="text-2xl md:text-3xl font-extrabold tracking-wide"
              style={{ fontFamily: "Orbitron, system-ui, sans-serif" }}
            >
              Entrar
            </h3>
            <p className="mt-2 text-white/60" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
              Use seu e-mail e senha para acessar a FutDraft.
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Campo de e-mail */}
            <div>
              <label className="mb-1 block text-sm text-white/80">E-mail</label>
              <input
                type="email"
                placeholder="voce@exemplo.com"
                {...register("email", { required: "E-mail é obrigatório" })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/40 focus:border-[#00FF66] focus:ring-2 focus:ring-[#00FF66]/30"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Campo de senha */}
            <div>
              <label className="mb-1 block text-sm text-white/80">Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password", { required: "Senha é obrigatória" })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/40 focus:border-[#00FF66] focus:ring-2 focus:ring-[#00FF66]/30"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Ações inferiores */}
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex cursor-pointer items-center gap-2 select-none">
                <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-transparent accent-[#00FF66]" />
                <span className="text-white/70" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>Lembrar de mim</span>
              </label>
              <button
                type="button"
                className="text-white/60 underline-offset-4 hover:text-white hover:underline"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                onClick={() => alert("Fluxo de recuperar senha em breve.")}
              >
                Esqueci a senha
              </button>
            </div>

            {/* Botão de enviar */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={submitting}
              className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00FF66] px-4 py-3 font-semibold text-[#0F1115] disabled:opacity-60"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              {/* Efeito brilho borda */}
              <span className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-b from-[#00FF66]/40 to-transparent opacity-0 blur transition-opacity group-hover:opacity-100" />
              {submitting ? "Entrando..." : "Entrar"}
            </motion.button>

            {/* Linha divisória */}
            <div className="my-2 h-px w-full bg-white/10" />

            {/* Link de cadastro (placeholder) */}
            <p className="text-center text-sm text-white/60" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
              Não tem conta? <button type="button" className="text-white hover:text-[#00FF66]" onClick={() => alert("Fluxo de registro em breve.")}>Registre-se</button>
            </p>
          </form>
        </motion.section>
      </div>
    </div>
  );
}
