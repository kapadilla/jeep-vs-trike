"use client";

import { useState } from "react";
import Board from "./Board";
import { calculateWinner, Cell, ICONS, NAMES, Player } from "@/lib/game";

const EMPTY: Cell[] = Array(9).fill(null);

export default function Game() {
  const [board, setBoard] = useState<Cell[]>(EMPTY);
  const [turn, setTurn] = useState<Player>("jeep");
  const [score, setScore] = useState({ jeep: 0, trike: 0, draw: 0 });

  const result = calculateWinner(board);
  const isDraw = !result && board.every(Boolean);
  const gameOver = !!result || isDraw;

  function play(i: number) {
    if (board[i] || gameOver) return;

    const next = [...board];
    next[i] = turn;
    setBoard(next);

    const res = calculateWinner(next);
    if (res) {
      setScore((s) => ({ ...s, [res.winner]: s[res.winner] + 1 }));
    } else if (next.every(Boolean)) {
      setScore((s) => ({ ...s, draw: s.draw + 1 }));
    }

    setTurn(turn === "jeep" ? "trike" : "jeep");
  }

  const status = result
    ? `${ICONS[result.winner]} ${NAMES[result.winner]} wins! 🎉`
    : isDraw
    ? "It's a draw! 🤝"
    : `${ICONS[turn]} ${NAMES[turn]}'s turn`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-sky-200 to-yellow-100 p-4">
      <h1 className="text-3xl font-bold text-slate-800">Jeep vs Trike</h1>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Scoreboard</h2>
      <div className="flex gap-6 rounded-xl bg-white/70 px-6 py-3 text-lg font-bold text-slate-800 shadow">
        <span>{ICONS.jeep} {score.jeep}</span>
        <span>🤝 {score.draw}</span>
        <span>{ICONS.trike} {score.trike}</span>
      </div>

      <p className="text-xl font-semibold text-slate-700" aria-live="polite">{status}</p>

      <Board
        board={board}
        winningLine={result?.line ?? []}
        disabled={gameOver}
        onPlay={play}
      />

      <button
        onClick={() => setBoard(EMPTY)}
        className="rounded-full bg-slate-800 px-6 py-2 font-semibold text-white transition hover:bg-slate-600"
      >
        New Game
      </button>
    </main>
  );
}