import { TicTacToe, TicTacToeProps } from ".";

export class TicTacToeVersusAI extends TicTacToe {

    public constructor(props: TicTacToeProps) {
        super(props);

    }

    public makeMove(index: number): boolean {
        let madeMove = false;
        let board = this.getBoard();
        let won = this.getWon();
        if (board[index] === "" && won.every((value) => value === null)) {
            board[index] = this.countTurn() % 2 === 0 ? "O" : "X";
            madeMove = true;
            let gameOver = this.checkWin()
            if (!gameOver) {
                this.makeAIMove()
            }

        }
        return madeMove
    }

    private makeAIMove(): void {
        let bestMovement = this.bestMove();
        let board = this.getBoard();
        board[bestMovement] = this.countTurn() % 2 === 0 ? "O" : "X";
        this.checkWin()

    }

    private bestMove(): number {
        let currentBoard = [...this.getBoard()]
        let bestScore = -Infinity
        let bestMovement: number = -1;
        for (let i = 0; i < currentBoard.length; i++) {
            if (currentBoard[i] === "") {
                let score = this.minimax(currentBoard)
                if (score > bestScore) {
                    bestScore = score
                    bestMovement = i
                }
                break
            }
        }
        return bestMovement
    }

    private minimax(board: string[]): number {
        return 1;
    }
}