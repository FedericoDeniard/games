
export interface TicTacToeProps {
  initialValue?: string;
  initialPlayer?: Players
}

export type Players = "X" | "O"
export type Cell = Players | ""

export type Results = string | null

export class TicTacToe {
  private board: Cell[];
  private initialPlayer: Players
  private currentPlayer: Players;
  private won: Array<number> = new Array(3);
  private winner: Results;

  public constructor(props: TicTacToeProps) {
    const initialValue = props.initialValue || "";
    this.initialPlayer = props.initialPlayer || "O";
    this.currentPlayer = this.initialPlayer
    this.board = new Array(3 * 3).fill(initialValue);
    this.winner = null
  }

  public getBoard(): Cell[] {
    return this.board;
  }

  public getWon(): Array<number> {
    return this.won;
  }

  protected checkWinner(board: string[]): Results {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    let winner: Results = null;
    let i = 0;

    while (i < lines.length && winner === null) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = board[a];
      }
      i++;
    }

    if (winner === null && board.every(cell => cell !== "")) {
      winner = "tie";
    }

    return winner;
  }

  public makeMove(index: number): boolean {
    let madeMove = false;
    if (this.board[index] === "" && this.won.every((value) => value === null)) {
      this.board[index] = this.countTurn() % 2 === 0 ? "O" : "X";
      madeMove = true;
      this.checkFinished(this.board)

    }
    return madeMove
  }

  public reset(): void {
    this.board = new Array(this.board.length).fill("");
    this.won = new Array(3);
    this.setCurrentPlayer("O")
    this.winner = null
  }

  protected switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
  }

  protected checkFinished(board: string[]): boolean {
    let tie: boolean = this.getBoard().every(cell => cell !== "");
    let hasFinished: boolean = tie ? true : false;
    let i = 0;

    while (i < board.length && !hasFinished) {
      if (i % 3 === 0 && this.checkLine(i, 1)) {
        hasFinished = true;
      }
      else if (i < 3 && this.checkLine(i, 3)) {
        hasFinished = true;
      }
      else if (i === 0 && this.checkLine(i, 4)) {
        hasFinished = true;
      }
      else if (i === 2 && this.checkLine(i, 2)) {
        hasFinished = true;
      }
      i++;
    }
    this.winner = this.checkWinner(board)
    return hasFinished;
  }

  protected checkLine(i: number, step: number, board: string[] = this.board): boolean {
    let hasWon: boolean = false;
    if (board[i] !== "" &&
      board[i] === board[i + step] &&
      board[i] === board[i + step * 2]) {
      hasWon = true
      this.won = [i, i + step, i + step * 2]
    }
    return hasWon
  }


  protected countTurn(board: string[] = this.board): number {
    return board.filter((cell) => cell !== "").length;
  }

  public getCurrentPlayer(): Players {
    return this.currentPlayer
  }

  protected setCurrentPlayer(player: Players): void {
    this.currentPlayer = player
  }

  protected getInitialPlayer(): Players {
    return this.initialPlayer
  }

  public getWinner(): Results {
    return this.winner
  }
}
