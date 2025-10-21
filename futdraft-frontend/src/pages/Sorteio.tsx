import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Shuffle, Users } from "lucide-react";

interface Player {
  id: string;
  name: string;
  confirmed: boolean;
}

interface Team {
  id: string;
  name: string;
  goals: number;
  players: Player[];
}

interface Game {
  id: string;
  name?: string;
  date: string;
  location: string;
  teamSize: number;
  players: Player[];
  teams: Team[];
}

export default function Sorteio() {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ⚠️ ID fixo temporário (depois será dinâmico)
  const gameId = "cafdebe9-1f57-4579-82b5-ddea807b6010";

  // 🔍 Buscar o jogo no backend e filtrar pelo ID
  const fetchGame = async () => {
    try {
      setError(null);
      const res = await fetch("http://localhost:8080/api/games");
      if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
      const data = await res.json();

      const foundGame = data.find((g: Game) => g.id === gameId);
      if (!foundGame) throw new Error("Jogo não encontrado.");
      setGame(foundGame);
    } catch (error) {
      console.error("Erro ao buscar jogo:", error);
      setError("Não foi possível carregar o jogo.");
    }
  };

  // ⚙️ Sortear times (aleatório ou balanceado)
  const sortearTimes = async (modo: "random" | "balanced") => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `http://localhost:8080/api/games/${gameId}/draft?mode=${modo}&teams=2`,
        { method: "POST" }
      );
      if (!res.ok) throw new Error("Erro ao sortear times.");
      await fetchGame(); // Recarrega os dados do jogo
    } catch (error) {
      console.error("Erro ao sortear times:", error);
      setError("Falha ao sortear. Verifique o backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGame();
  }, []);

  // 💭 Estado de carregamento
  if (!game && !error) {
    return <p className="text-center text-gray-400 mt-10">Carregando jogo...</p>;
  }

  // ❌ Estado de erro
  if (error) {
    return (
      <p className="text-center text-red-500 mt-10 font-semibold">
        {error}
      </p>
    );
  }

  // ✅ Garante que "game" não é nulo a partir daqui
  const jogo = game!;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-[#00FF7F]">Sorteio de Times</h1>

      {/* Informações básicas do jogo */}
      <div className="text-gray-400 text-sm mb-8 text-center">
        <p>
          <span className="text-[#00FF7F] font-semibold">Local:</span>{" "}
          {jogo.location}
        </p>
        <p>
          <span className="text-[#00FF7F] font-semibold">Data:</span>{" "}
          {new Date(jogo.date).toLocaleDateString()}
        </p>
        <p>
          <span className="text-[#00FF7F] font-semibold">
            Jogadores confirmados:
          </span>{" "}
          {jogo.players?.length || 0}
        </p>
      </div>

      {/* Botões de sorteio */}
      <div className="flex gap-4 mb-10">
        <Button
          disabled={loading}
          onClick={() => sortearTimes("random")}
          className="bg-[#00FF7F] text-black font-bold hover:opacity-80 transition"
        >
          <Shuffle className="mr-2 w-4 h-4" /> Sortear Aleatório
        </Button>

        <Button
          disabled={loading}
          onClick={() => sortearTimes("balanced")}
          className="border border-[#00FF7F] text-[#00FF7F] font-bold hover:bg-[#00FF7F] hover:text-black transition"
        >
          <Users className="mr-2 w-4 h-4" /> Sortear Balanceado
        </Button>
      </div>

      {/* Exibição dos times */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {jogo.teams && jogo.teams.length > 0 ? (
          jogo.teams.map((team, i) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <Card className="bg-[#111] border border-[#1C1C1C] shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#00FF7F] text-lg font-semibold">
                    {team.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {team.players.length > 0 ? (
                    <ul className="space-y-2">
                      {team.players.map((p) => (
                        <li
                          key={p.id}
                          className="bg-[#1C1C1C] px-3 py-2 rounded-md text-gray-200"
                        >
                          {p.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm italic">
                      Nenhum jogador neste time.
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-2">
            Nenhum time sorteado ainda. Clique em “Sortear” para começar.
          </p>
        )}
      </div>
    </div>
  );
}
