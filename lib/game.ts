export type Player = "jeep" | "trike";
export type Cell = Player | null;

export const ICONS: Record<Player, string> = { jeep: "🚐", trike: "🛺" };
export const NAMES: Record<Player, string> = { jeep: "Jeepney", trike: "Trike" };

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export function calculateWinner(board: Cell[]) {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line: [a, b, c] };
    }
  }
  return null;
}