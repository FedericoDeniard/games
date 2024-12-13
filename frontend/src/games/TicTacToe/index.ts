
interface TicTacToeProps {
  size?: number;
  initialValue?: string;
}

export class TicTacToe {
  private board: string[];
  private won: Array<number> = new Array(3);

  public constructor(props: TicTacToeProps) {
    const size = props.size || 3;
    const initialValue = props.initialValue || "";
    this.board = new Array(size * size).fill(initialValue);
  }

  public getBoard(): string[] {
    return this.board;
  }

  public getWon(): Array<number> {
    return this.won;
  }

  public makeMove(index: number): void {
    if (this.board[index] === "" && this.won.every((value) => value === null)) {
      this.board[index] = this.countTurn() % 2 === 0 ? "O" : "X";
      if (this.checkWin()) {
        console.log("WIN", this.won);
      }
    }

  }

  public reset(): void {
    this.board = new Array(this.board.length).fill("");
    this.won = new Array(3);
  }

  private checkWin(): boolean {
    let hasWon: boolean = false;
    let i = 0;
    while (i < this.board.length && !hasWon) {
      if (
        this.checkLine(i, 1) ||
        this.checkLine(i, 3) ||
        this.checkLine(i, 4)
      ) {
        hasWon = true;
      }
      i++;
    }
    return hasWon;
  }


  private checkLine(i: number, step: number): boolean {
    let hasWon: boolean = false;
    if (this.board[i] !== "" &&
      this.board[i] === this.board[i + step] &&
      this.board[i] === this.board[i + step * 2]) {
      hasWon = true
      this.won = [i, i + step, i + step * 2]
    }
    return hasWon
  }


  private countTurn(): number {
    return this.board.filter((cell) => cell !== "").length;
  }
}
