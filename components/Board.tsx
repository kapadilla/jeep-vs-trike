import { Cell, ICONS } from "@/lib/game";

type Props = {
  board: Cell[];
  winningLine: number[];
  disabled: boolean;
  onPlay: (i: number) => void;
};

export default function Board({ board, winningLine, disabled, onPlay }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {board.map((cell, i) => {
        const isWin = winningLine.includes(i);
        return (
          <button
            key={i}
            onClick={() => onPlay(i)}
            disabled={disabled || cell !== null}
            aria-label={`Row ${Math.floor(i / 3) + 1}, column ${(i % 3) + 1}, ${cell ?? "empty"}`}
            className={`flex h-24 w-24 items-center justify-center rounded-xl border-2 text-5xl transition sm:h-28 sm:w-28 enabled:hover:bg-yellow-100 disabled:cursor-not-allowed ${
              isWin ? "scale-105 border-yellow-500 bg-yellow-300" : "border-slate-300 bg-white"
            }`}
          >
            {cell && <span className="animate-pop">{ICONS[cell]}</span>}
          </button>
        );
      })}
    </div>
  );
}