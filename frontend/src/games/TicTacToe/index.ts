
export interface TicTacToeProps {
  initialValue?: string;
}

export class TicTacToe {
  private board: string[];
  private won: Array<number> = new Array(3);

  public constructor(props: TicTacToeProps) {
    const initialValue = props.initialValue || "";
    this.board = new Array(3 * 3).fill(initialValue);
  }

  public getBoard(): string[] {
    return this.board;
  }

  public getWon(): Array<number> {
    return this.won;
  }

  public makeMove(index: number): boolean {
    let madeMove = false;
    if (this.board[index] === "" && this.won.every((value) => value === null)) {
      this.board[index] = this.countTurn() % 2 === 0 ? "O" : "X";
      madeMove = true;
      this.checkWin(this.board)
    }
    return madeMove
  }

  public reset(): void {
    this.board = new Array(this.board.length).fill("");
    this.won = new Array(3);
  }

  protected checkWin(board: string[]): boolean {
    let hasWon: boolean = false;
    let i = 0;
    while (i < board.length && !hasWon) {
      if (i % 3 === 0 && this.checkLine(i, 1)) {
        hasWon = true;
      }
      else if (i < 3 && this.checkLine(i, 3)) {
        hasWon = true;
      }
      else if (i === 0 && this.checkLine(i, 4)) {
        hasWon = true;
      }
      else if (i === 2 && this.checkLine(i, 2)) {
        hasWon = true;
      }
      i++;
    }
    return hasWon;
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
}
