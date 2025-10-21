// src/pages/GamesUI.tsx
// =========================================
// UI de Jogos FutDraft: Criar / Inscrever-se / Confirmar
// Visual: FutDraft (grafite #0F1115, verde #00FF66), Orbitron/Inter
// Recursos: React Hook Form, Framer Motion, Tailwind
// Obs: sem backend ainda — usa "estado local" e "mock data" para você ver o fluxo
// =========================================

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

// ---------- Tipos ----------
type CreateMatchForm = {
  date: string;     // YYYY-MM-DD (input nativo)
  time: string;     // HH:mm (input nativo)
  place: string;    // local/campo
  slots: number;    // qtde de vagas
  fee?: number;     // taxa por jogo (opcional)
  notes?: string;   // observações
};

type Match = {
  id: string;
  date: string;     // "2025-10-25"
  time: string;     // "19:30"
  place: string;    // "Arena X"
  slots: number;    // vagas totais
  taken: number;    // vagas ocupadas
  fee?: number;
  notes?: string;
  createdByMe?: boolean; // para destacar jogos criados por você (mock)
};

type Enrollment = {
  matchId: string;
  confirmed: boolean;
};

// ---------- Mock inicial (sem backend) ----------
const initialMatches: Match[] = [
  {
    id: "m1",
    date: "2025-10-25",
    time: "19:30",
    place: "Arena Vila Fut",
    slots: 16,
    taken: 9,
    fee: 15,
    notes: "Trazer colete escuro",
  },
  {
    id: "m2",
    date: "2025-10-28",
    time: "20:00",
    place: "Quadra 7 - Complexo Alfa",
    slots: 14,
    taken: 14,
    fee: 10,
    notes: "Lotado, aguarde vaga",
  },
  {
    id: "m3",
    date: "2025-11-02",
    time: "09:00",
    place: "Campo Municipal B",
    slots: 12,
    taken: 3,
  },
];

export default function GamesUI() {
  // Aba ativa: "create" | "join" | "confirm"
  const [tab, setTab] = useState<"create" | "join" | "confirm">("create");

  // Lista de jogos (mock até conectar com backend)
  const [matches, setMatches] = useState<Match[]>(initialMatches);

  // Minhas inscrições (mock): matchId + status (confirmado ou não)
  const [myEnrollments, setMyEnrollments] = useState<Enrollment[]>([]);

  // Estado de envio (feedback de UX)
  const [submitting, setSubmitting] = useState(false);

  // React Hook Form para "Criar Jogo"
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateMatchForm>();

  // ---------- Helpers ----------
  const available = (m: Match) => Math.max(m.slots - m.taken, 0);
  const isEnrolled = (matchId: string) =>
    myEnrollments.some((e) => e.matchId === matchId);

  const myEnrollmentOf = (matchId: string) =>
    myEnrollments.find((e) => e.matchId === matchId);

  // ---------- Ações (sem backend, só estado local) ----------
  const onCreateMatch = async (data: CreateMatchForm) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600)); // simula requisição

    const newMatch: Match = {
      id: crypto.randomUUID(),
      date: data.date,
      time: data.time,
      place: data.place,
      slots: Number(data.slots),
      fee: data.fee ? Number(data.fee) : undefined,
      notes: data.notes?.trim() || undefined,
      taken: 0,
      createdByMe: true,
    };

    setMatches((prev) => [newMatch, ...prev]);
    reset();
    setSubmitting(false);
    setTab("join"); // após criar, vai pra lista pra você se inscrever
  };

  const onEnroll = (match: Match) => {
    // Se já inscrito, faz nada
    if (isEnrolled(match.id)) return;

    // Se não há vagas, alerta
    if (available(match) <= 0) {
      alert("Esse jogo está lotado. Aguarde uma vaga!");
      return;
    }

    // Marca inscrição e incrementa "taken"
    setMyEnrollments((prev) => [...prev, { matchId: match.id, confirmed: false }]);
    setMatches((prev) =>
      prev.map((m) =>
        m.id === match.id ? { ...m, taken: m.taken + 1 } : m
      )
    );
  };

  const onUnenroll = (match: Match) => {
    // Remove inscrição e decrementa "taken" se não estava confirmado
    const enr = myEnrollmentOf(match.id);
    if (!enr) return;

    // Se estava confirmado, exige "desconfirmar" antes (apenas regra de UX local)
    if (enr.confirmed) {
      alert("Desconfirme a presença antes de cancelar a inscrição.");
      return;
    }

    setMyEnrollments((prev) => prev.filter((e) => e.matchId !== match.id));
    setMatches((prev) =>
      prev.map((m) =>
        m.id === match.id ? { ...m, taken: Math.max(m.taken - 1, 0) } : m
      )
    );
  };

  const onConfirmPresence = (matchId: string) => {
    setMyEnrollments((prev) =>
      prev.map((e) =>
        e.matchId === matchId ? { ...e, confirmed: true } : e
      )
    );
  };

  const onUndoConfirm = (matchId: string) => {
    setMyEnrollments((prev) =>
      prev.map((e) =>
        e.matchId === matchId ? { ...e, confirmed: false } : e
      )
    );
  };

  // ---------- Visual base ----------
  return (
    <div className="min-h-screen bg-[#0F1115] text-white p-4 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        {/* Header simples com logo e título */}
        <div className="mb-6 flex items-center gap-3">
          <img src="/futdraft-logo.png" alt="FutDraft" className="h-10 w-10" />
          <h1
            className="text-2xl md:text-3xl font-extrabold tracking-wide"
            style={{ fontFamily: "Orbitron, system-ui, sans-serif" }}
          >
            Jogos — FutDraft
          </h1>
        </div>

        {/* Card principal */}
        <div className="rounded-3xl border border-white/10 bg-[#0B0D10]/70 backdrop-blur p-4 md:p-8">
          {/* Tabs */}
          <div className="flex gap-3 border-b border-white/10">
            {[
              { id: "create", label: "Criar Jogo" },
              { id: "join", label: "Inscrever-se" },
              { id: "confirm", label: "Confirmar Presença" },
            ].map((t) => {
              const active = tab === (t.id as typeof tab);
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id as typeof tab)}
                  className={`relative px-3 py-3 text-sm md:text-base transition ${
                    active ? "text-[#00FF66]" : "text-white/70 hover:text-white"
                  }`}
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  {t.label}
                  {active && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute left-0 right-0 -bottom-px mx-3 h-0.5 bg-[#00FF66]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Conteúdo das abas */}
          <div className="mt-6">
            {tab === "create" && (
              <motion.div
                key="tab-create"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Informativo/branding à esquerda */}
                <div className="order-2 md:order-1 rounded-2xl border border-white/10 p-6">
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: "Orbitron, system-ui, sans-serif" }}
                  >
                    Organize sua pelada
                  </h3>
                  <p className="text-white/70" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                    Defina data, hora, local e vagas. A FutDraft cuida do restante.
                    Você pode cobrar taxa por jogo e deixar observações (ex: traje, regras, etc.).
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {["Sorteio rápido", "Lista de presença", "Controle de vagas"].map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Formulário de criação à direita */}
                <div className="order-1 md:order-2 rounded-2xl border border-white/10 p-6">
                  <form onSubmit={handleSubmit(onCreateMatch)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-white/80 mb-1">Data</label>
                        <input
                          type="date"
                          {...register("date", { required: "Data é obrigatória" })}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-[#00FF66] focus:ring-2 focus:ring-[#00FF66]/30"
                        />
                        {errors.date && <p className="text-sm text-red-400 mt-1">{errors.date.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm text-white/80 mb-1">Hora</label>
                        <input
                          type="time"
                          {...register("time", { required: "Hora é obrigatória" })}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-[#00FF66] focus:ring-2 focus:ring-[#00FF66]/30"
                        />
                        {errors.time && <p className="text-sm text-red-400 mt-1">{errors.time.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-white/80 mb-1">Local</label>
                      <input
                        type="text"
                        placeholder="Arena, quadra, campo..."
                        {...register("place", { required: "Local é obrigatório" })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/40 focus:border-[#00FF66] focus:ring-2 focus:ring-[#00FF66]/30"
                      />
                      {errors.place && <p className="text-sm text-red-400 mt-1">{errors.place.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-white/80 mb-1">Vagas</label>
                        <input
                          type="number"
                          min={2}
                          max={30}
                          {...register("slots", {
                            required: "Informe as vagas",
                            valueAsNumber: true,
                            min: { value: 2, message: "Mínimo 2" },
                            max: { value: 30, message: "Máximo 30" },
                          })}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-[#00FF66] focus:ring-2 focus:ring-[#00FF66]/30"
                        />
                        {errors.slots && <p className="text-sm text-red-400 mt-1">{errors.slots.message as string}</p>}
                      </div>

                      <div>
                        <label className="block text-sm text-white/80 mb-1">Taxa (R$) — opcional</label>
                        <input
                          type="number"
                          step="0.5"
                          min={0}
                          {...register("fee", { valueAsNumber: true })}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-[#00FF66] focus:ring-2 focus:ring-[#00FF66]/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-white/80 mb-1">Observações</label>
                      <textarea
                        rows={3}
                        placeholder="Ex: trazer colete escuro"
                        {...register("notes")}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/40 focus:border-[#00FF66] focus:ring-2 focus:ring-[#00FF66]/30"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={submitting}
                      className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00FF66] px-4 py-3 font-semibold text-[#0F1115] disabled:opacity-60"
                    >
                      {submitting ? "Criando..." : "Criar Jogo"}
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            )}

            {tab === "join" && (
              <motion.div
                key="tab-join"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {matches.map((m) => {
                  const vagas = available(m);
                  const enrolled = isEnrolled(m.id);

                  return (
                    <div key={m.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-semibold">{m.place}</h4>
                          <p className="text-white/60 text-sm">{m.date} · {m.time}</p>
                        </div>
                        {m.createdByMe && (
                          <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-xs text-white/80">
                            Meu jogo
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="text-white/70">Vagas</span>
                        <span className={`font-semibold ${vagas > 0 ? "text-[#00FF66]" : "text-red-400"}`}>
                          {m.taken}/{m.slots} {vagas === 0 ? "(lotado)" : ""}
                        </span>
                      </div>

                      {m.fee !== undefined && (
                        <div className="mt-1 text-sm text-white/70">Taxa: R$ {m.fee.toFixed(2)}</div>
                      )}

                      {m.notes && (
                        <div className="mt-1 text-xs text-white/50">Obs: {m.notes}</div>
                      )}

                      <div className="mt-4 flex items-center gap-2">
                        {!enrolled ? (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onEnroll(m)}
                            className="flex-1 rounded-xl bg-[#00FF66] px-3 py-2 text-[#0F1115] font-semibold"
                          >
                            Inscrever
                          </motion.button>
                        ) : (
                          <>
                            <span className="flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-center text-white/80">
                              Inscrito
                            </span>
                            <button
                              onClick={() => onUnenroll(m)}
                              className="rounded-xl border border-white/15 px-3 py-2 text-white/80 hover:bg-white/10"
                            >
                              Cancelar
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {tab === "confirm" && (
              <motion.div
                key="tab-confirm"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {myEnrollments.length === 0 && (
                  <div className="col-span-full text-center text-white/70">
                    Você ainda não se inscreveu em nenhum jogo.
                  </div>
                )}

                {myEnrollments.map((e) => {
                  const m = matches.find((mm) => mm.id === e.matchId);
                  if (!m) return null;
                  return (
                    <div key={m.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <h4 className="text-lg font-semibold">{m.place}</h4>
                      <p className="text-white/60 text-sm">{m.date} · {m.time}</p>

                      <div className="mt-4 flex items-center gap-2">
                        {!e.confirmed ? (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onConfirmPresence(m.id)}
                            className="flex-1 rounded-xl bg-[#00FF66] px-3 py-2 text-[#0F1115] font-semibold"
                          >
                            Confirmar Presença
                          </motion.button>
                        ) : (
                          <>
                            <span className="flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-center text-white/80">
                              Presença Confirmada ✅
                            </span>
                            <button
                              onClick={() => onUndoConfirm(m.id)}
                              className="rounded-xl border border-white/15 px-3 py-2 text-white/80 hover:bg-white/10"
                            >
                              Desfazer
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
