import React, { useState } from "react";
import GamesUI from "./pages/GamesUI";
import LoginRegister from "./pages/LoginRegister";
import Sorteio from "./pages/Sorteio";

export default function App() {
  const [page, setPage] = useState("games");

  const renderPage = () => {
    switch (page) {
      case "login":
        return <LoginRegister />;
      case "sorteio":
        return <Sorteio />;
      default:
        return <GamesUI />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Cabeçalho simples */}
      <header className="flex justify-center gap-6 py-4 border-b border-[#1C1C1C] bg-[#111] shadow">
        <button
          onClick={() => setPage("games")}
          className={`px-4 py-2 rounded-md font-semibold ${
            page === "games"
              ? "bg-[#00FF7F] text-black"
              : "text-[#00FF7F] border border-[#00FF7F] hover:bg-[#00FF7F] hover:text-black"
          }`}
        >
          Jogos
        </button>

        <button
          onClick={() => setPage("sorteio")}
          className={`px-4 py-2 rounded-md font-semibold ${
            page === "sorteio"
              ? "bg-[#00FF7F] text-black"
              : "text-[#00FF7F] border border-[#00FF7F] hover:bg-[#00FF7F] hover:text-black"
          }`}
        >
          Sorteio
        </button>

        <button
          onClick={() => setPage("login")}
          className={`px-4 py-2 rounded-md font-semibold ${
            page === "login"
              ? "bg-[#00FF7F] text-black"
              : "text-[#00FF7F] border border-[#00FF7F] hover:bg-[#00FF7F] hover:text-black"
          }`}
        >
          Login
        </button>
      </header>

      {/* Área principal */}
      <main className="p-6">{renderPage()}</main>
    </div>
  );
}
